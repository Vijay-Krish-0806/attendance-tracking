"use client"; // Ensure client-side rendering

import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getUniqueRecord } from "../../_services/service";

const Barchart = ({ attendanceList, totalPresentData }) => {
  const [data, setData] = useState([]); // Initialize with empty array

  useEffect(() => {
    formatAttendanceList();
  }, [attendanceList, totalPresentData]);

  const formatAttendanceList = () => {
    const totalStudent = getUniqueRecord(attendanceList || []);
    const result = (totalPresentData || []).map((item) => ({
      day: item.day,
      presentCount: item.presentCount,
      absentCount: totalStudent.length - item.presentCount,
    }));
    setData(result);
  };

  return (
    <div className="p-5 border rounded-lg shadow-sm">
      <h2 className="my-2 font-bold text-lg">Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="presentCount" name="Total present" fill="#8884d8" />
          <Bar dataKey="absentCount" name="Total absent" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
