import { Types } from "mongoose";
import * as staffRepo from "./staffRepository";
import { IStaff } from "../../models/staffModel";

export const createStaff = async (data: IStaff) => {
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

export const getAllStaff = async (salonId: Types.ObjectId) => {
  return await staffRepo.getAllStaffRepo(salonId);
};
