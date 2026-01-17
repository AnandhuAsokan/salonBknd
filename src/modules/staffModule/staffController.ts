import { Request, Response } from "express";
import * as staffService from "./staffServices";
import { Types } from "mongoose";
import { addHolidayService, getDatesOfWeekdayForCurrentYear, weekdayMap } from "../../utils/helper";
import holyDayModel from "../../models/holyDayModel";
import staffModel from "../../models/staffModel";
import { editWorkingHoursService } from "./staffServices";

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

    const staffList = await staffService.getAllStaff();

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

export const getStaffsByServiceController = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;
    const staffList = await staffService.getStaffsByService(new Types.ObjectId(serviceId));
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

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staffList = await staffService.GetAllStaffs();
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

export const updateWeeklyOffDay = async (req: any, res: any) => {
  const { weekday } = req.body;

  if (!weekday || !weekdayMap[weekday.toLowerCase()]) {
    return res.status(400).json({ message: 'Invalid weekday' });
  }

  const weekdayNumber = weekdayMap[weekday.toLowerCase()];
  const dates = getDatesOfWeekdayForCurrentYear(weekdayNumber);

  // Update holiday settings
  await holyDayModel.updateOne(
    {},
    { $set: { weeklyOffDays: dates } }
  );

  // Replace weekly off days for ALL staff
  await staffModel.updateMany(
    {},
    { $set: { weeklyOffDays: dates } }
  );

  res.json({
    success: true,
    message: `Weekly off updated to ${weekday}`,
    totalDays: dates.length
  });
};

export const addHoliday = async (req: Request, res: Response) => {
  try {
    const { date } = req.body;

    const holidayDate = await addHolidayService(date);

    res.status(201).json({
      success: true,
      message: 'Holiday added successfully',
      date: holidayDate
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const editWorkingHours = async (req: Request, res: Response) => {
  try {
    const { startTime , endTime } = req.body;

    await editWorkingHoursService(startTime, endTime);

    res.status(200).json({
      success: true,
      message: 'Working hours updated successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }}