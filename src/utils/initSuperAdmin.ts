import Admin from '../models/superAdminModel';
import companySettingsModel from '../models/companySettingsModel';
import bcrypt from 'bcrypt';

const initSuperAdmin = async () => {
  const existingSuperAdmin = await Admin.findOne({ role: 'SuperAdmin' });
  if (existingSuperAdmin) return;

  const adminEmail = process.env.SUPER_ADMIN_EMAIL;
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('Super admin credentials not set in env');
  }

  await Admin.create({
    name: 'Super Admin',
    email: adminEmail,
    password: adminPassword,
    role: 'SuperAdmin'
  });

  console.log('✅ Super Admin initialized');
};

export default initSuperAdmin;
