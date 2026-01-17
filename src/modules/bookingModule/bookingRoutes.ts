import express from 'express';
import * as bookingController from './bookingController';

const router = express.Router();

router.post('/', bookingController.createBooking);
router.put('/bookings/:id', bookingController.updateBooking);
router.get('/bookings/:id', bookingController.getBookingById);
router.get('/bookings', bookingController.getAllBookings);
router.patch('/bookings/:id/status', bookingController.changeBookingStatus);
router.get('/bookings/analytics', bookingController.getBookingAnalytics);
router.get('/bookings/peak-time', bookingController.getPeakBookingPeriod);

export default router;
