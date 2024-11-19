"use client";

import React, { useState } from "react";
import MonthSelection from "../../_components/MonthSelection";
import GradeSelect from "../../_components/GradeSelect";
import { Button } from "../../../components/ui/button";
import { GetAttendanceList } from "../../_services/GlobalApi";
import moment from "moment";
import AttendanceGrid from "./_components/AttendanceGrid";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const onSearchHandler = () => {
    const month = moment(selectedMonth).format("MM/YYYY");
    // console.log(month);
    GetAttendanceList(selectedGrade, month)
      .then((res) => {
        if (res && res.data) {
          setAttendanceList(res.data);
          // console.log({attendanceList});
        } else {
          console.error("No data received");
        }
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      });
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      <div className="flex items-center gap-5 p-5 shadow-sm border rounded-lg my-5">
        <div className="flex  items-center gap-2 ">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex items-center gap-2">
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button onClick={() => onSearchHandler()}>Search</Button>
      </div>
      <AttendanceGrid
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Attendance;
