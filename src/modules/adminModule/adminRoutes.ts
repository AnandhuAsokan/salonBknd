import express from 'express';
import * as adminController from './adminController';

const router = express.Router();

router.post('/signup', adminController.createAdmin);
router.get('/admins', adminController.viewAllAdmins);
router.get('/admin/:email', adminController.viewAdmin);

export default router;
