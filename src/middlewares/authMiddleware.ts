import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded as unknown as { id: string; role: string };
  } catch (error : any) {
    console.error('❌ Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};