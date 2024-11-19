import { Schema, model, models } from "mongoose";

const StudentsSchema = new Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

export const Students = models?.Students || model("Students", StudentsSchema);
