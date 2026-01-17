import { Request, Response } from 'express';
import {
  createBookingService,
  updateBookingService,
  getBookingByIdService,
  getAllBookingsService,
  changeBookingStatusService,
  bookingAnalyticsService,
  getPeakBookingPeriodService,
  GetBookingByCustomer,
} from './bookingServices';
import { AuthRequest } from '../../types/authRequest';
import mongoose from 'mongoose';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    req.body.userId = userId;
    const booking = await createBookingService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await updateBookingService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await getBookingByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const bookings = await getAllBookingsService(status as string);

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const booking = await changeBookingStatusService(req.params.id, status);

    return res.status(200).json({
      success: true,
      message: 'Booking status updated',
      data: booking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;

    const data = await bookingAnalyticsService(startDate as string, endDate as string);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPeakBookingPeriod = async (req: Request, res: Response) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'date is required (YYYY-MM-DD)',
      });
    }

    const data = await getPeakBookingPeriodService(date as string);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingByCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.userId;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    console.log(id);
    const userId = new mongoose.Types.ObjectId(id);
    const user = await GetBookingByCustomer(userId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
