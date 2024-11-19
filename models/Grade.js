import { Schema, model, models } from "mongoose";

const GradesSchema = new Schema(
  {
    grade: { type: String, required: true },
  },
  { timestamps: true }
);

export const Grade = models?.Grade || model("Grade", GradesSchema);
