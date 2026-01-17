import Admin from '../models/superAdminModel';
import holyDayModel from '../models/holyDayModel';
import bcrypt from 'bcrypt';
import { getDatesOfWeekdayForCurrentYear } from './helper';

export const initSuperAdmin = async () => {
  const existingSuperAdmin = await Admin.findOne({ role: 'SuperAdmin' });
  if (existingSuperAdmin) return;

  const adminEmail = process.env.SUPER_ADMIN_EMAIL;
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('Super admin credentials not set in env');
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await Admin.create({
    name: 'Super Admin',
    email: adminEmail,
    password: hashedPassword,
    role: 'SuperAdmin'
  });

  console.log('✅ Super Admin initialized');
};


export const initHolidaySettings = async () => {
  let holiday = await holyDayModel.findOne();

  if (!holiday) {
    const sundays = getDatesOfWeekdayForCurrentYear(0);

    holiday = await holyDayModel.create({
      weeklyOffDays: sundays,
      holidayDays: [],
      openingHours: '09:00 am',
      closingHours: '05:00 pm'
    });

    console.log('✅ Holiday settings created with Sundays');
    return;
  }

  if (holiday.weeklyOffDays.length === 0) {
    holiday.weeklyOffDays = getDatesOfWeekdayForCurrentYear(0);
    await holiday.save();

    console.log('✅ Weekly off days auto-filled with Sundays');
  }
};

