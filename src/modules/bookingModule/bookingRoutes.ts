import express from 'express';
import * as bookingController from './bookingController';

const router = express.Router();

router.post('/', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.get('/:id', bookingController.getBookingById);
router.get('/', bookingController.getAllBookings);
router.patch('/:id/status', bookingController.changeBookingStatus);
router.post('/analytics', bookingController.getBookingAnalytics);
router.post('/peak-time', bookingController.getPeakBookingPeriod);
router.post('/client', bookingController.getBookingByCustomer);

export default router;
