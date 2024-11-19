import { NextResponse } from "next/server";
import connectDB from "../../_components/index";

import { Grade } from "../../../models/Grade";

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all grades
    const result = await Grade.find({});

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching grades:", error);
    return NextResponse.json(
      { error: "Failed to fetch grades" },
      { status: 500 }
    );
  }
}
