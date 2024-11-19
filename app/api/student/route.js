import { NextResponse } from "next/server";
import connectDB from "../../_components/index";
// Ensure you have a connectDB function for MongoDB
import { Students } from "../../../models/Students"; // Your MongoDB Students model

export async function POST(req, res) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get data from the request body
    const data = await req.json();

    // Validate required fields
    const { name, grade, contact, address } = data;

    if (!name || !grade || !contact) {
      return NextResponse.json(
        { error: "Missing required fields: name, grade, contact" },
        { status: 400 }
      );
    }

    // Create a new student document
    const result = await Students.create({
      name,
      grade,
      contact,
      address: address || "", // Optional field
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all students
    const result = await Students.find().lean(); // `lean()` makes it a plain JavaScript object
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing student ID" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Delete the student by ID
    const result = await Students.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
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
