import {
  createBookingRepo,
  updateBookingRepo,
  findBookingByIdRepo,
  findAllBookingsRepo,
  updateBookingStatusRepo,
  countBookingsByDateRangeRepo,
  countBookingsByStatusRepo,
  bookingsGroupedByStartTimeRepo,
  getBookingsForDayRepo,
  getBookingByCustomer,
} from './bookingRepository';
import { viewUserById } from '../userModule/userRepository';
import { findServiceById } from '../serviceModule/serviceRepository';
import { Types } from 'mongoose';

export const createBookingService = async (data: any) => {
  const { staffId, serviceId, userId, date, slot } = data;

  if (!staffId || !serviceId || !userId || !date || !slot) {
    throw new Error('All required fields must be provided');
  }

  const userDetails = await viewUserById(userId);
  if (!userDetails) throw new Error('User not found');

  const serviceDetails = await findServiceById(serviceId);
  if (!serviceDetails) throw new Error('Service not found');

  const [startTime, endTime] = slot.split(' to ');

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = startMinutes + serviceDetails.duration;

  data.amount = serviceDetails.price;
  data.customerName = userDetails.name;
  data.customerId = userId;
  data.startTime = startTime;
  data.endTime = endTime;
  data.startMinutes = startMinutes;
  data.endMinutes = endMinutes;

  return await createBookingRepo(data);
};



export const updateBookingService = async (bookingId: string, data: any) => {
  const booking = await findBookingByIdRepo(bookingId);
  if (!booking) throw new Error('Booking not found');

  return await updateBookingRepo(bookingId, data);
};

export const getBookingByIdService = async (bookingId: string) => {
  const booking = await findBookingByIdRepo(bookingId);
  if (!booking) throw new Error('Booking not found');

  return booking;
};

export const getAllBookingsService = async (status?: string) => {
  const filter: any = {};

  if (status) {
    const allowedStatus = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!allowedStatus.includes(status)) {
      throw new Error('Invalid booking status');
    }
    filter.status = status;
  }

  return await findAllBookingsRepo(filter);
};

export const changeBookingStatusService = async (bookingId: string, status: string) => {
  const allowedStatus = ['pending', 'confirmed', 'completed', 'cancelled'];

  if (!allowedStatus.includes(status)) {
    throw new Error('Invalid booking status');
  }

  const booking = await updateBookingStatusRepo(bookingId, status);
  if (!booking) throw new Error('Booking not found');

  return booking;
};

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const bookingAnalyticsService = async (startDate?: string, endDate?: string) => {
  const from = startDate || getTodayDate();
  const to = endDate || getTodayDate();

  if (from > to) {
    throw new Error('Invalid date range');
  }

  type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
  /* TOTAL BOOKINGS */
  const totalBookings = await countBookingsByDateRangeRepo(from, to);

  /* STATUS COUNTS */
  const statusCountsRaw = await countBookingsByStatusRepo(from, to);

  const statusCounts: Record<BookingStatus, number> = {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  statusCountsRaw.forEach((s: { _id: BookingStatus; count: number }) => {
    statusCounts[s._id] += s.count;
  });

  /* BUSIEST TIMES */
  const busiestTimesRaw = await bookingsGroupedByStartTimeRepo(from, to);

  const busiestTimes = busiestTimesRaw.map((b: any) => ({
    time: b._id,
    bookings: b.count,
  }));

  return {
    dateRange: { from, to },
    totalBookings,
    statusCounts,
    busiestTimes,
  };
};

export const timeToMinutes = (time: string): number => {
  time = time.trim().toLowerCase(); // "09:00am"

  const match = time.match(/(\d{1,2}):(\d{2})(am|pm)/);
  if (!match) throw new Error(`Invalid time format: ${time}`);

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3];

  if (period === 'pm' && hour !== 12) hour += 12;
  if (period === 'am' && hour === 12) hour = 0;

  return hour * 60 + minute;
};


export const getPeakBookingPeriodService = async (date: string) => {
  if (!date) {
    throw new Error('Date is required');
  }

  const bookings = await getBookingsForDayRepo(date);

  const periods = {
    morning: 0, // 09:00 – 12:00
    afternoon: 0, // 12:00 – 17:00
    evening: 0, // 17:00 – 21:00
  };

  bookings.forEach(b => {
    const startMinutes = timeToMinutes(b.startTime);

    if (startMinutes >= 540 && startMinutes < 720) {
      periods.morning++;
    } else if (startMinutes >= 720 && startMinutes < 1020) {
      periods.afternoon++;
    } else if (startMinutes >= 1020 && startMinutes < 1260) {
      periods.evening++;
    }
  });

  const peakPeriod = Object.entries(periods).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ['', 0]
  );

  return {
    date,
    periods,
    peakPeriod: {
      name: peakPeriod[0],
      bookings: peakPeriod[1],
    },
  };
};

export const GetBookingByCustomer = async (userId: Types.ObjectId) => {
  return await getBookingByCustomer(userId);
};
