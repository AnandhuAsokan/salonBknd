// models/Booking.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  // salonId: Types.ObjectId;
  staffId: Types.ObjectId;
  serviceId: Types.ObjectId;
  customerName: string;
  customerId: Types.ObjectId;
  customerPhone?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  startMinutes: number;
  endMinutes: number;
  status: 'pending' | 'completed' | 'cancelled';
  amount: number;
  review?: string;
}

const bookingSchema = new Schema<IBooking>(
  {
    // salonId: { type: Schema.Types.ObjectId, ref: "Salon", required: true },
    staffId: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },

    customerName: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    customerPhone: { type: String, required: false },

    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },

    startMinutes: { type: Number, required: true },
    endMinutes: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },

    amount: { type: Number, required: true },
    review: { type: String, required: false },
  },
  { timestamps: true }
);

export default model<IBooking>('Booking', bookingSchema);
