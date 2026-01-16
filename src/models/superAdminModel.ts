import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: {type: Buffer, required: true},
  salt: {type: Buffer},
  role: { type: String, enum: ['SuperAdmin'] },
  createdAt: { type: Date, default: Date.now },
});

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt) as unknown as Buffer;
    this.salt = salt as unknown as Buffer;
  }
  next();
});

export default mongoose.model('Admin', adminSchema);
