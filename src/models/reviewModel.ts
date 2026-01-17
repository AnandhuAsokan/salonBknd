import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  salonId: Types.ObjectId;
  bookingId: Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new Schema<IReview>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: "Salon", required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String
  },
  { timestamps: true }
);

export default model<IReview>("Review", reviewSchema);
