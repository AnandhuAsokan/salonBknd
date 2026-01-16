// models/StaffSlot.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IStaffSlot extends Document {
  staffId: Types.ObjectId;
  salonId: Types.ObjectId;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  isBooked: boolean;
}

const staffSlotSchema = new Schema<IStaffSlot>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: "Salon", required: true },
    staffId: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default model<IStaffSlot>("StaffSlot", staffSlotSchema);
