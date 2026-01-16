import StaffModel from "../../models/staffModel";
import { IStaff } from "../../models/staffModel";
import { Types } from "mongoose";

export const createStaffRepo = async (data: IStaff) => {
  return await StaffModel.create(data);
};

export const updateStaffRepo = async (
  staffId: Types.ObjectId,
  data: Partial<IStaff>
) => {
  return await StaffModel.findByIdAndUpdate(staffId, data, { new: true });
};

export const getStaffByIdRepo = async (staffId: Types.ObjectId) => {
  return await StaffModel
    .findById(staffId)
    .populate("services");
};

export const getAllStaffRepo = async (salonId: Types.ObjectId) => {
  return await StaffModel
    .find({ salonId })
    .populate("services")
    .sort({ createdAt: -1 });
};
