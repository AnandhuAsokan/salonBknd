import { loginAdmin, userLogin } from './authService';
import { Request, Response } from 'express';

export const SuperAdminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await loginAdmin(email, password);
    res.status(200).json({ message: 'Login successful', ...result });
  } catch (error : any) {
    res.status(401).json({ message: error.message });
  }
};

export const UserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await userLogin(email, password);
    res.status(200).json({ message: 'Login successful', ...result });
  } catch (error : any) {
    res.status(401).json({ message: error.message });
  }
};

