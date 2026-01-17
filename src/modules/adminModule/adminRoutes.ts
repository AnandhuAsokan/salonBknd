import express from 'express';
import * as adminController from './adminController';

const router = express.Router();

router.post('/signup', adminController.createAdmin);
router.get('/', adminController.viewAllAdmins);
router.get('/:email', adminController.viewAdmin);

export default router;
