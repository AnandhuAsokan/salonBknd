import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import connectDB from './src/config/db';
dotenv.config();
import { initSuperAdmin, initHolidaySettings } from './src/utils/initSuperAdmin';
import { Request, Response, NextFunction } from 'express';

const port = process.env.PORT || 3000;
__dirname = path.resolve();

// Routers
import authRoutes from './src/modules/auth/authRoutes';
import adminRoutes from './src/modules/adminModule/adminRoutes';
import userRoutes from './src/modules/userModule/userRoutes';
import staffRoutes from './src/modules/staffModule/staffRoutes';
import serviceRoutes from './src/modules/serviceModule/serviceRoutes';
import bookingRoutes from './src/modules/bookingModule/bookingRoutes';
import companySettingsRoutes from './src/modules/companySettings/companySettingsRoutes';

import { authMiddleware } from './src/middlewares/authMiddleware';

const app = express();

connectDB()
  .then(async () => {
    await initSuperAdmin();
    await initHolidaySettings();
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to database:', err);
  });

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://yourfrontend.com'],
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use(authMiddleware);
app.use('/company-settings', companySettingsRoutes);
app.use('/staff', staffRoutes);
app.use('/services', serviceRoutes);
app.use('/bookings', bookingRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status((err.status as number) || 500).json({
    message: err.message || 'Server Error',
  });
});

export default app;
