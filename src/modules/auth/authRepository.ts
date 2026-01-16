import Admin from '../../models/superAdminModel';
import User from '../../models/userModel';

export const findAdminByEmail = async (email: string) => {
  return await Admin.findOne({ email }) as unknown as { _id: string; name: string; email: string; role: string; password: Buffer; salt: Buffer };
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }) as unknown as { _id: string; name: string; email: string; role: string; password: Buffer; salt: Buffer };
};
