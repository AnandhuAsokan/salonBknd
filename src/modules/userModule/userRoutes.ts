import express from 'express';
import * as userController from './userController';

const router = express.Router();

router.post('/signup', userController.createUser);
router.get('/', userController.viewAllUsers);
router.get('/:email', userController.viewUser);
router.get('/user/:id', userController.viewUserById);

export default router;
