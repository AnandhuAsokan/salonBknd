import { Request, Response } from "express";
import * as staffService from "./staffServices";
import { Types } from "mongoose";

/* CREATE STAFF */
export const createStaffController = async (req: Request, res: Response) => {
  try {
    const staff = await staffService.createStaff(req.body);

    return res.status(201).json({
      success: true,
      data: staff,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE STAFF */
export const updateStaffController = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.params;

    const updatedStaff = await staffService.updateStaff(
      new Types.ObjectId(staffId),
      req.body
    );

    if (!updatedStaff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedStaff,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* VIEW STAFF (BY ID) */
export const getStaffController = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.params;

    const staff = await staffService.getStaffById(
      new Types.ObjectId(staffId)
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* VIEW ALL STAFF */
export const getAllStaffController = async (req: Request, res: Response) => {
  try {
    const { salonId } = req.params;

    const staffList = await staffService.getAllStaff(
      new Types.ObjectId(salonId)
    );

    return res.status(200).json({
      success: true,
      count: staffList.length,
      data: staffList,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
