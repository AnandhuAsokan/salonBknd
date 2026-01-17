import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: {type: Buffer, required: true},
  salt: {type: Buffer},
  role: { type: String, enum: ['User'] },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt) as unknown as Buffer;
    this.salt = salt as unknown as Buffer;
  }
  next();
});

export default mongoose.model('User', userSchema);
