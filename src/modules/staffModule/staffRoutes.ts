import { Router } from 'express';
import {
  createStaffController,
  updateStaffController,
  getStaffController,
  getAllStaffController,
} from './staffController';

const router = Router();

router.post('/', createStaffController);
router.put('/:staffId', updateStaffController);
router.get('/:staffId', getStaffController);
// router.get('/salon/:salonId', getAllStaffController);

export default router;
