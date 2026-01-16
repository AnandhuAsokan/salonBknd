import Booking, { IBooking } from "../../models/bookingModel";
import { Types } from "mongoose";

export const createBookingRepo = (data: Partial<IBooking>) => {
  return Booking.create(data);
};

export const updateBookingRepo = (
  bookingId: string,
  data: Partial<IBooking>
) => {
  return Booking.findByIdAndUpdate(bookingId, data, { new: true });
};

export const findBookingByIdRepo = (bookingId: string) => {
  return Booking.findById(bookingId);
};

export const findAllBookingsRepo = (filter: any) => {
  return Booking.find(filter)
    .populate("staffId serviceId salonId")
    .sort({ createdAt: -1 });
};

export const updateBookingStatusRepo = (
  bookingId: string,
  status: string
) => {
  return Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );
};

/* BOOKINGS COUNT (DATE RANGE) */
export const countBookingsByDateRangeRepo = (
  startDate: string,
  endDate: string
) => {
  return Booking.countDocuments({
    date: { $gte: startDate, $lte: endDate }
  });
};

/* STATUS COUNTS */
export const countBookingsByStatusRepo = (
  startDate: string,
  endDate: string
) => {
  return Booking.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);
};

/* BUSIEST TIME SLOTS */
export const bookingsGroupedByStartTimeRepo = (
  startDate: string,
  endDate: string
) => {
  return Booking.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
        status: { $ne: "cancelled" }
      }
    },
    {
      $group: {
        _id: "$startTime",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

export const getBookingsForDayRepo = (date: string) => {
  return Booking.find({
    date,
    status: { $ne: "cancelled" }
  }).select("startTime");
};