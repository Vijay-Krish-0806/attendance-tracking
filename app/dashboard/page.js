"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelect from "../_components/GradeSelect";
import {
  GetAttendanceList,
  TotalPresentCountByDay,
} from "../_services/GlobalApi";
import moment from "moment";

import StatusList from "./_components/StatusList";
import Barchart from "./_components/Barchart";
import PieChartComponent from "./_components/PieChartComponent";

const Dashboard = () => {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState();
  useEffect(() => {
    // setTheme("light");
    getTotalPresentCountByDay();
    getStudentAttendance();
  }, [selectedMonth || selectedGrade]);

  const getStudentAttendance = () => {
    GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/yyyy")
    ).then((res) => {
      setAttendanceList(res.data);
    });
  };

  const getTotalPresentCountByDay = () => {
    TotalPresentCountByDay(
      moment(selectedMonth).format("MM/yyyy"),
      selectedGrade
    ).then((res) => {
      setTotalPresentData(res.data);
    });
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">DashBoard</h2>
        <div className="flex gap-4 items-center">
          <MonthSelection selectedMonth={(v) => setSelectedMonth(v)} />
          <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />
      <div className="grid grid-col2-1 gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <Barchart
            attendanceList={attendanceList}
            totalPresentData={totalPresentData}
          />
        </div>
        <div>
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
