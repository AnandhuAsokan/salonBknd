import { Request, Response } from 'express';
import { isEmailExist } from './userRepository';
import * as userServices from './userServices';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const EmailExist = await isEmailExist(email);
    if (EmailExist) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const createdUser = await userServices.CreateUser(email, password);

    return res.status(201).json({
      success: true,
      data: createdUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await userServices.ViewUser(email);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const viewAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.ViewAllUsers();
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
