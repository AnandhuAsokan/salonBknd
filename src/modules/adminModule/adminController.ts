import { Request, Response } from 'express';
import { isEmailExist } from './adminRepository';
import * as adminServices from './adminServices';

export const createAdmin = async (req: Request, res: Response) => {
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

    const createdAdmin = await adminServices.CreateAdmin(email, password);

    return res.status(201).json({
      success: true,
      data: createdAdmin,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const viewAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const admin = await adminServices.ViewAdmin(email);
    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const viewAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await adminServices.ViewAllAdmins();
    return res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
