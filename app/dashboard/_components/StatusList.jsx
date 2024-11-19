"use client";
import React, { useEffect, useState } from "react";
import { getUniqueRecord } from "../../_services/service";
import moment from "moment";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import Card from "./Card";

const StatusList = ({ attendanceList }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPerc, setTotalPerc] = useState(0);
  // console.log(attendanceList);
  useEffect(() => {
    if (attendanceList) {
      const totalSt = getUniqueRecord(attendanceList);
      // console.log(totalSt);
      const studentCount = totalSt.length;
      setTotalStudents(studentCount);

      const today = parseInt(moment().format("D"), 10); // Ensure `today` is a number
      const presentPerc =
        studentCount > 0
          ? (attendanceList.length / (studentCount * today)) * 100
          : 0; // Handle division by zero
      setTotalPerc(presentPerc);
    }
  }, [attendanceList]); // Dependency array to avoid infinite loop

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
      <Card
        icon={<GraduationCap />}
        title="Total Studnets"
        value={totalStudents}
      />
      <Card
        icon={<TrendingUp />}
        title="Total Present"
        value={100 - totalPerc.toFixed(1) + "%"}
      />
      <Card
        icon={<TrendingDown />}
        title="Total Absent"
        value={totalPerc.toFixed(1) + "%"}
      />
    </div>
  );
};

export default StatusList;
