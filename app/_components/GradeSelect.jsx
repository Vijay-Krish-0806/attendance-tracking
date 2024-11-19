"use client";
import React, { useEffect, useState } from "react";
import { GetAllGrades } from "../_services/GlobalApi";

const GradeSelect = ({ selectedGrade }) => {
  const [grades, setGrades] = useState();
  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GetAllGrades().then((res) => {
      // console.log(res.data);
      setGrades(res.data);
    });
  };

  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => selectedGrade(e.target.value)}
      >
        {grades?.map((item, index) => (
          <option value={item.grade} key={index}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelect;
