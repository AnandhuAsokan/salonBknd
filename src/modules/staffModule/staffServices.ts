import { Types } from "mongoose";
import * as staffRepo from "./staffRepository";
import { IStaff } from "../../models/staffModel";
import holyDayModel from "../../models/holyDayModel";

export const createStaff = async (data: IStaff) => {
  const holidaySettings = await holyDayModel.findOne();

  if (!holidaySettings) {
    throw new Error('Holiday settings not initialized');
  }

  data.weeklyOffDays = holidaySettings.weeklyOffDays;
  data.holidayDays = holidaySettings.holidayDays || [];
  return await staffRepo.createStaffRepo(data);
};

export const updateStaff = async (
  staffId: Types.ObjectId,
  data: Partial<IStaff>
) => {
  return await staffRepo.updateStaffRepo(staffId, data);
};

export const getStaffById = async (staffId: Types.ObjectId) => {
  return await staffRepo.getStaffByIdRepo(staffId);
};

export const getAllStaff = async () => {
  return await staffRepo.getAllStaffRepo();
};

export const getStaffsByService = async (serviceId: Types.ObjectId) => {
  return await staffRepo.getStaffByService(serviceId);
};

export const GetAllStaffs = async () => {
  return await staffRepo.getAllStaff();
};

export const editWorkingHoursService = async (startTime: string, endTime: string) => {
  return await staffRepo.editWorkingHoursRepo(startTime, endTime);
}