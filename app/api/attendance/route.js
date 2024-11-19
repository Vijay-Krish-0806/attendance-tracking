import { NextResponse } from "next/server";
import { Attendance } from "../../../models/Attendance";
import { Students } from "../../../models/Students";
import connectDB from "../../_components/index";
// GET: Retrieve attendance based on grade and month

export async function GET(req) {
  await connectDB();
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");

  try {
    const result = await Students.aggregate([
      {
        $match: {
          grade: grade, // First, filter students by grade
        },
      },
      {
        $lookup: {
          from: "attendances", // Ensure this matches your actual collection name
          localField: "_id",
          foreignField: "studentId",
          pipeline: [
            {
              $match: {
                date: month,
              },
            },
          ],
          as: "attendanceData",
        },
      },
      {
        $unwind: {
          path: "$attendanceData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          present: "$attendanceData.present",
          day: "$attendanceData.day",
          date: "$attendanceData.date",
          grade: 1,
          studentId: "$_id",
          attendanceId: "$attendanceData._id",
        },
      },
    ]);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST route - Insert attendance data
export async function POST(req, res) {
  const data = await req.json();

  try {
    const result = await Attendance.create({
      studentId: data.studentId,
      present: data.present,
      day: data.day,
      date: data.date,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Attendance creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE route - Delete attendance data
export async function DELETE(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const studentId = searchParams.get("studentId");
    const date = searchParams.get("date");
    const day = searchParams.get("day");

    if (!studentId || !date || !day) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const result = await Attendance.deleteOne({
      studentId: studentId,
      day: day,
      date: date,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "No record found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
