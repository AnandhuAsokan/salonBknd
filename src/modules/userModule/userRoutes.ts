import express from 'express';
import * as userController from './userController';

const router = express.Router();

router.post('/signup', userController.createUser);
router.get('/users', userController.viewAllUsers);
router.get('/user/:email', userController.viewUser);

export default router;
