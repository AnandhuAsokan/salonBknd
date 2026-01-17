import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { findAdminByEmail, findUserByEmail } from './authRepository';

export const loginAdmin = async (email: string, password: string) => {
  const admin = await findAdminByEmail(email);
  if (!admin) throw new Error('Invalid email or password');

  if (admin.role !== 'SuperAdmin') {
    throw new Error('Invalid Admin Credentials');
  }

  const isMatch = await bcrypt.compare(password, admin.password.toString());
  if (!isMatch) throw new Error('Invalid email or password');

  const payload = { userId: admin._id.toString(), role: admin.role };
  const options: SignOptions = { expiresIn: '1d' };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, options);

  return {
    token,
    admin: {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};

export const userLogin = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  if (user.role !== 'User') {
    throw new Error('Invalid User Credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password.toString());
  if (!isMatch) throw new Error('Invalid email or password');

  const payload = { userId: user._id.toString(), role: user.role };
  const options: SignOptions = { expiresIn: '1d' };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, options);

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
