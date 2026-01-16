import { Types } from "mongoose";
import * as serviceRepo from "./serviceRepository";
import { IService } from "../../models/salonServicesModel";
import {
  findServiceById,
  findStaffByServiceId,
  findBookingsByStaffAndDate
} from "./serviceRepository";

export const createService = async (data: IService) => {
  return await serviceRepo.createServiceRepo(data);
};

export const updateService = async (
  serviceId: Types.ObjectId,
  data: Partial<IService>
) => {
  return await serviceRepo.updateServiceRepo(serviceId, data);
};

export const getServiceById = async (serviceId: Types.ObjectId) => {
  return await serviceRepo.getServiceByIdRepo(serviceId);
};

export const getAllServices = async () => {
  return await serviceRepo.getAllServicesRepo();
};

export const deleteService = async (serviceId: Types.ObjectId) => {
  return await serviceRepo.softDeleteServiceRepo(serviceId);
};

export const updateServiceStatus = async (
  serviceId: Types.ObjectId,
  isActive: boolean
) => {
  return await serviceRepo.updateServiceStatusRepo(serviceId, isActive);
};


const WORK_START = 9 * 60;   // 9 AM
const WORK_END = 21 * 60;    // 9 PM

const minutesToTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}${period}`;
};

const isOverlap = (
  start1: number,
  end1: number,
  start2: number,
  end2: number
) => start1 < end2 && start2 < end1;

export const getStaffSlotsByService = async (
  serviceId: string,
  date: string
) => {
  const service = await findServiceById(serviceId);
  if (!service) throw new Error("Service not found");

  const duration = service.duration;

  const staffList = await findStaffByServiceId(serviceId);

  const result: any[] = [];

  for (const staff of staffList) {
    // skip staff on leave
    if (staff.leaveDays.includes(date)) continue;

    const bookings = await findBookingsByStaffAndDate(
      staff._id as Types.ObjectId,
      date
    );

    const bookedSlots = bookings.map(b => {
      const [sh, sm] = b.startTime.split(":").map(Number);
      const [eh, em] = b.endTime.split(":").map(Number);
      return {
        start: sh * 60 + sm,
        end: eh * 60 + em
      };
    });

    const slots: string[] = [];

    for (
      let start = WORK_START;
      start + duration <= WORK_END;
      start += duration
    ) {
      const end = start + duration;

      const hasConflict = bookedSlots.some(b =>
        isOverlap(start, end, b.start, b.end)
      );

      if (!hasConflict) {
        slots.push(
          `${minutesToTime(start)} to ${minutesToTime(end)}`
        );
      }
    }

    if (slots.length) {
      result.push({
        staffId: staff._id,
        name: staff.name,
        slots
      });
    }
  }

  return result;
};
