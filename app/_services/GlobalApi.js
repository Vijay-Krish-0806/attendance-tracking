const { default: axios } = require("axios");

export const GetAllGrades = () => axios.get("/api/grade");
export const GetAllStudents = () => axios.get("/api/student");

export const CreateNewStudent = async (data) => {
  try {
    const response = await fetch("/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json(); // Make sure to return the parsed JSON
  } catch (error) {
    console.error("Error creating new student:", error);
    throw error; // Propagate the error for handling
  }
};

export const DeleteStudentRecord = (id) =>
  axios.delete("/api/student?id=" + id);

export const GetAttendanceList = async (selectedGrade, month) => {
  try {
    const response = await fetch(
      `/api/attendance?grade=${selectedGrade}&month=${month}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    return { data: null, error };
  }
};

export const MarkAttendance = (data) => {
  return axios.post("/api/attendance", data);
};

export const MarkAbsent = (studentId, date, day) =>
  axios.delete(
    `/api/attendance?studentId=${studentId}&date=${date}&day=${day}`
  );

export const TotalPresentCountByDay = (date, grade) =>
  axios.get(`/api/dashboard?date=${date}&grade=${grade}`);
