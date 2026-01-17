import { Schema, model, Document, Types } from "mongoose";

export interface IHolyDay extends Document {
    weeklyOffDays: string[];
    holidayDays: string[];
    openingHours: string;
    closingHours: string;
}

const holyDaySchema = new Schema<IHolyDay>(
    {
       weeklyOffDays: { type: [String], },
       holidayDays: { type: [String], },
       openingHours: { type: String, },
       closingHours: { type: String, },
    },
    { timestamps: true }
)

export default model<IHolyDay>("HolyDay", holyDaySchema);