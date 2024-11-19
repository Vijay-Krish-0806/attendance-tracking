"use client";

import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { getUniqueRecord } from "../../_services/service";

const PieChartComponent = ({ attendanceList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceList) {
      const totalSt = getUniqueRecord(attendanceList);
      const studentCount = totalSt.length;
      const today = parseInt(moment().format("D"), 10);
      const presentPerc =
        studentCount > 0
          ? (attendanceList.length / (studentCount * today)) * 100
          : 0;

      const chartData = [
        {
          name: "Total Absent",
          value: parseFloat(presentPerc.toFixed(1)),
          fill: "#4c8cf8",
        },
        {
          name: "Total Present",
          value: parseFloat((100 - presentPerc).toFixed(1)),
          fill: "#f8370e",
        },
      ];

      setData(chartData);
    }
  }, [attendanceList]);

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="my-2 font-bold text-lg">Monthly Attendance</h2>

      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
