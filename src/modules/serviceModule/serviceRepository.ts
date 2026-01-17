import ServiceModel, { IService } from "../../models/salonServicesModel";
import { Types } from "mongoose";
import staffModel from "../../models/staffModel";
import bookingModel from "../../models/bookingModel";

export const createServiceRepo = async (data: IService) => {
  return await ServiceModel.create(data);
};

export const updateServiceRepo = async (
  serviceId: Types.ObjectId,
  data: Partial<IService>
) => {
  return await ServiceModel.findOneAndUpdate(
    { _id: serviceId, isDeleted: false },
    data,
    { new: true }
  );
};

export const getServiceByIdRepo = async (serviceId: Types.ObjectId) => {
  return await ServiceModel.findOne({
    _id: serviceId,
    isDeleted: false,
  });
};

export const getAllServicesRepo = async () => {
  return await ServiceModel.find({ isDeleted: false }).sort({ createdAt: -1 });
};

export const softDeleteServiceRepo = async (serviceId: Types.ObjectId) => {
  return await ServiceModel.findByIdAndUpdate(
    serviceId,
    { isDeleted: true },
    { new: true }
  );
};

export const updateServiceStatusRepo = async (
  serviceId: Types.ObjectId,
  isActive: boolean
) => {
  return await ServiceModel.findOneAndUpdate(
    { _id: serviceId, isDeleted: false },
    { isActive },
    { new: true }
  );
};

export const findServiceById = (serviceId: string) => {
  const id =  new Types.ObjectId(serviceId);
  return ServiceModel.findById(id);
};

export const findStaffByServiceId = (serviceId: string) => {
  return staffModel.find({
    services: new Types.ObjectId(serviceId)
  });
};

export const findBookingsByStaffAndDate = (
  staffId: Types.ObjectId,
  date: string
) => {
  return bookingModel.find({
    staffId,
    date,
    status: { $ne: "cancelled" }
  });
};