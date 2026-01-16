import express from 'express';
import * as authController from './authController';

const router = express.Router();

router.post('/admin/login', authController.SuperAdminLogin);
router.post('/user/login', authController.UserLogin);

export default router;
