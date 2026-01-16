// import { Schema, model, Document } from "mongoose";

// export interface ISalon extends Document {
//   name: string;
//   ownerName: string;
//   email: string;
//   phone: string;
//   password: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
//   isVerified: boolean;
//   isActive: boolean;
//   location: {
//     type: string;
//     coordinates: [number, number];
//   };
//   images: string[];
//   description: string;
//   logoUrl: string;
//   bannerImages: string[];
//   blogPosts: string[];
//   ratings: number;
//   reviews: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// const salonSchema = new Schema<ISalon>(
//   {
//     name: { type: String, required: true },
//     ownerName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true },
//     address: { type: String, required: true },
//     city: String,
//     state: String,
//     pincode: String,
//     isVerified: { type: Boolean, default: false },
//     isActive: { type: Boolean, default: true },
//     location: {
//       type: { type: String, default: "Point" },
//       coordinates: { type: [Number], required: true }
//     },
//     images: { type: [String], required: true },
//     description: { type: String, required: true },
//     logoUrl: { type: String, required: true },
//     bannerImages: { type: [String], required: true },
//     blogPosts: { type: [String], required: true },
//     ratings: { type: Number, required: true },
//     reviews: { type: [String], required: true }
//   },
//   { timestamps: true }
// );

// export default model<ISalon>("Salon", salonSchema);
