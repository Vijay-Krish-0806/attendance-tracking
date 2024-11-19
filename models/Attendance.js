import { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Students", required: true },
    present: { type: Boolean, default: false },
    day: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const Attendance =
  models?.Attendance || model("Attendance", AttendanceSchema);
