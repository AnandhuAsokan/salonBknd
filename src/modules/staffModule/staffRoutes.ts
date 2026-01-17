import { Router } from 'express';
import {
  createStaffController,
  updateStaffController,
  getStaffController,
  getAllStaffController,
  getStaffsByServiceController,
  updateWeeklyOffDay,
  addHoliday,
  editWorkingHours
} from './staffController';

const router = Router();

router.post('/', createStaffController);
router.get('/', getAllStaffController);
router.put('/:staffId', updateStaffController);
router.get('/:staffId', getStaffController);
router.get('/staff/:serviceId', getStaffsByServiceController);
router.post('/weekly-off', updateWeeklyOffDay);
router.post('/holiday', addHoliday);
router.post('/working-hours', editWorkingHours);

export default router;
