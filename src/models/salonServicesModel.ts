// models/Service.ts
import { Schema, model, Document, Types } from "mongoose";

enum IdealFor {
  Men = 'Men',
  Women = 'Women',
  Kids = 'Kids',
  All = 'All'
}
enum Category {
  Hair = 'Hair',
  Skin = 'Skin',
  Nails = 'Nails',
  Makeup = 'Makeup',
  Body = 'Body',
  consultation = 'consultation',
  Other = 'Other',
}
export interface IService extends Document {
  // salonId: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  duration: number; // in minutes
  idealFor: IdealFor;
  category: Category;
  isActive: boolean;
  isDeleted: boolean;
}

const serviceSchema = new Schema<IService>(
  {
    // salonId: { type: Schema.Types.ObjectId, ref: "Salon", required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    idealFor: { type: String, enum: ['Men', 'Women', 'Kids', 'All'], required: true },
    category: { type: String, enum: ['Hair', 'Skin', 'Nails', 'Makeup', 'Body', 'Other'], required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IService>("Service", serviceSchema);
