"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
import { MarkAbsent, MarkAttendance } from "../../../_services/GlobalApi";
import { toast } from "sonner";

import { getUniqueRecord } from "../../../_services/service";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];
const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
  ]);
  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const numberOfDays = daysInMonth(
    moment(selectedMonth).year(),
    moment(selectedMonth).month()
  );
  //   console.log({ numberOfDays });
  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
  //   console.log(daysArray.length);

  const fillArray = (userList) => {
    daysArray.forEach((date) => {
      setColDefs((prevData) => [
        ...prevData,
        { field: date.toString(), width: 50, editable: true },
      ]);
      userList.forEach((obj) => {
        obj[date] = isPresent(obj.studentId, date);
      });
    });
  };
  useEffect(() => {
    if (attendanceList) {
      // console.log({ attendanceList });
      const userList = getUniqueRecord(attendanceList);
      setRowData(userList);
      // console.log(rowData);
      fillArray(userList);
    }
  }, [attendanceList]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day == day && item.studentId == studentId
    );

    return result ? true : false;
  };

  const onMarkAttendance = async (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/yyyy");

    if (presentStatus !== undefined) {
      const data = {
        day: day, // Ensure day is passed
        studentId: studentId, // Ensure studentId is passed
        present: presentStatus, // Ensure present status is passed
        date: date, // Ensure date is passed
      };

      try {
        if (presentStatus) {
          await MarkAttendance(data);
          toast(`Student id: ${studentId} marked as present`);
        } else {
          await MarkAbsent(studentId, date, day);
          toast(`Student id: ${studentId} marked as absent`);
        }
      } catch (err) {
        console.error("Error marking attendance:", err);
        toast(`Failed to mark attendance for Student id: ${studentId}`);
      }
    } else {
      toast("Please select present or absent status");
    }
  };

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: "calc(100vh - 100px)", width: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={(e) => {
          onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue);
        }}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};
export default AttendanceGrid;
