import mongoose, { Schema, Document } from 'mongoose';

export interface ICompanySettings extends Document {
  companyName: string;
  nameAlias: string;
  logoUrl?: string;
  tagline?: string;
  gstNumber?: string;
  panNumber?: string;

  contactDetails?: {
    phone?: string;
    email?: string;
    website?: string;
  };

  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    district?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };

  defaultTaxRate?: number;
  currency?: string;

  bookingConfig?: {
    allowSameDayBooking?: boolean;
    minAdvanceMinutes?: number;
    maxDaysInAdvance?: number;
    defaultTimeSlotDuration?: number;
  };

  razorpay?: {
    keyId?: string;
    keySecret?: string;
    webhookSecret?: string;
    isEnabled?: boolean;
  };

  workingHours?: {
    start?: string;
    end?: string;
  };

  defaultPolicies?: {
    cancellationPolicy?: string;
    refundPolicy?: string;
    termsAndConditions?: string;
    privacyPolicy?: string;
  };

  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };

  isBranchSpecific?: boolean;
  branch?: mongoose.Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
  status?: 'Active' | 'Inactive';
}

const companySettingsSchema = new Schema<ICompanySettings>(
  {
    companyName: { type: String, required: true },
    nameAlias: { type: String, required: true, unique: true },
    logoUrl: String,
    tagline: String,
    gstNumber: String,
    panNumber: String,

    contactDetails: {
      phone: String,
      email: String,
      website: String,
    },

    address: {
      line1: String,
      line2: String,
      city: String,
      district: String,
      state: String,
      pincode: String,
      country: String,
    },

    defaultTaxRate: { type: Number, default: 18 },
    currency: { type: String, default: 'INR' },

    bookingConfig: {
      allowSameDayBooking: { type: Boolean, default: true },
      minAdvanceMinutes: { type: Number, default: 30 },
      maxDaysInAdvance: { type: Number, default: 30 },
      defaultTimeSlotDuration: { type: Number, default: 30 },
    },

    razorpay: {
      keyId: String,
      keySecret: String,
      webhookSecret: String,
      isEnabled: { type: Boolean, default: false },
    },

    workingHours: {
      start: String,
      end: String,
    },

    defaultPolicies: {
      cancellationPolicy: String,
      refundPolicy: String,
      termsAndConditions: String,
      privacyPolicy: String,
    },

    theme: {
      primaryColor: String,
      secondaryColor: String,
      fontFamily: String,
    },

    isBranchSpecific: { type: Boolean, default: false },
    branch: { type: Schema.Types.ObjectId, ref: 'Branch' },

    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  {
    timestamps: true,
  }
);

export const CompanySettings = mongoose.model<ICompanySettings>(
  'CompanySettings',
  companySettingsSchema
);

export default CompanySettings;
