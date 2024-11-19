import { NextResponse } from "next/server";

import { Attendance } from "../../../models/Attendance";
import { Students } from "../../../models/Students";
import connectDB from "../../_components/index";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const date = searchParams.get("date");

  try {
    const result = await Attendance.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "studentDetails",
        },
      },
      {
        $unwind: "$studentDetails",
      },
      {
        $match: {
          "studentDetails.grade": grade,
          date: date,
        },
      },
      {
        $group: {
          _id: "$day",
          presentCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $limit: 7,
      },
      {
        $project: {
          day: "$_id",
          presentCount: 1,
          _id: 0,
        },
      },
    ]);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
