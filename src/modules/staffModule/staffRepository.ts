import holyDayModel from "../../models/holyDayModel";
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

export const getAllStaffRepo = async () => {
  return await StaffModel
    .find()
    .populate("services")
    .sort({ createdAt: -1 });
};

export const getStaffByService = async (serviceId: Types.ObjectId) => {
  return await StaffModel.find({ services: serviceId }).populate("services")
};

export const getAllStaff = async () => {
  return await StaffModel
    .find({"status": "active"})
    .populate("services")
    .sort({ createdAt: -1 });
};

export const editWorkingHoursRepo = async (
  openingHours: string,
  closingHours: string
) => {
  return await holyDayModel.updateOne(
    {},
    {
      $set: {
        openingHours,
        closingHours
      }
    }
  );
};
