// models/Staff.ts
import { Schema, model, Document, Types } from "mongoose";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
export interface IStaff extends Document {
  // salonId: Types.ObjectId;
  name: string;
  gender: Gender;
  age: number;
  experience?: number;
  education?: string;
  skills?: string[];
  certifications?: string[];
  awards?: string[];
  ratings?: Types.ObjectId[];
  reviews?: Types.ObjectId[];
  role?: string;
  phone: string;
  photoUrl?: string;
  services: Types.ObjectId[];
  leaveDays: string[];
  joinedAt: Date;
  status?: string;
}

const staffSchema = new Schema<IStaff>(
  {
    // salonId: { type: Schema.Types.ObjectId, ref: "Salon", required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    experience: { type: Number, },
    education: { type: String, },
    skills: { type: [String], },
    certifications: { type: [String], },
    awards: { type: [String], },
    ratings: { type: [Schema.Types.ObjectId], ref: "Review" },
    reviews: { type: [Schema.Types.ObjectId], ref: "Rating"},
    role: { type: String, },
    phone: { type: String, required: true },
    photoUrl: { type: String, },
    services: { type: [Schema.Types.ObjectId], ref: "Service", required: true },
    leaveDays: { type: [String], },
    joinedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);

export default model<IStaff>("Staff", staffSchema);
