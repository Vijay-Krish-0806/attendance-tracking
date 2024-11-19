"use client";

import React, { useEffect, useState } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import { GetAllStudents } from "../../_services/GlobalApi";

import StudentListTable from "./_components/StudentListTable";

const Student = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    GetAllStudentsList();
  }, []);

  const GetAllStudentsList = () => {
    GetAllStudents().then((res) => {
      // console.log(res.data);
      setStudentList(res.data);
    });
  };

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl">
        Students
        <AddNewStudent refreshData={GetAllStudentsList} />
      </h2>
      <StudentListTable
        studentList={studentList}
        refreshData={GetAllStudentsList}
      />
    </div>
  );
};

export default Student;
