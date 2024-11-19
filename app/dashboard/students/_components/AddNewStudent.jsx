"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { useForm } from "react-hook-form";
import { CreateNewStudent, GetAllGrades } from "../../../_services/GlobalApi";
import { toast } from "sonner";
import { Loader, LoaderIcon } from "lucide-react";

const AddNewStudent = ({ refreshData }) => {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GetAllGrades().then((res) => {
      // console.log(res.data);
      setGrades(res.data);
    });
  };

  const onSubmit = (data) => {
    // console.log("FormData", data);
    setLoading(true);
    CreateNewStudent(data)
      .then((res) => {
        if (res) {
          // Ensure res exists
          setLoading(false);
          setOpen(false);

          toast("Successfully added");
          reset();
          refreshData();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast("Failed to add student");
      });
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <div className="text-sm text-muted-foreground">
              <form
                onSubmit={handleSubmit(onSubmit)}
                suppressHydrationWarning={true}
              >
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    placeholder="Example Name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Select Grade</label>
                  <select
                    className="p-3 border rounded-lg"
                    {...register("grade", { required: true })}
                  >
                    {grades?.map((item, index) => (
                      <option value={item.grade} key={index}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Contact Number</label>
                  <Input
                    type="number"
                    placeholder="9999 9999 99"
                    {...register("contact", { required: true })}
                  />
                </div>
                <div>
                  <label>Address</label>
                  <Input placeholder="Street" {...register("address")} />
                </div>
                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
