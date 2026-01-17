import { Types } from 'mongoose';
import * as serviceRepo from './serviceRepository';
import { IService } from '../../models/salonServicesModel';
import {
  findServiceById,
  findStaffByServiceId,
  findBookingsByStaffAndDate,
} from './serviceRepository';
import {
  getCurrentMinutes,
  isPastDate,
  isToday,
  normalizeDate,
  roundUpToQuarter,
} from '../../utils/helper';

export const createService = async (data: IService) => {
  return await serviceRepo.createServiceRepo(data);
};

export const updateService = async (serviceId: Types.ObjectId, data: Partial<IService>) => {
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

export const updateServiceStatus = async (serviceId: Types.ObjectId, isActive: boolean) => {
  return await serviceRepo.updateServiceStatusRepo(serviceId, isActive);
};

const WORK_START = 9 * 60; // 9 AM
const WORK_END = 21 * 60; // 9 PM

const minutesToTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return `${hour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}${period}`;
};

const isOverlap = (start1: number, end1: number, start2: number, end2: number) =>
  start1 < end2 && start2 < end1;

export const getStaffSlotsByService = async (serviceId: string, date: string) => {
  // 🔒 Block past dates completely
  date = normalizeDate(date);
  if (isPastDate(date)) {
    return [];
  }

  if (!Types.ObjectId.isValid(serviceId)) {
    throw new Error('Invalid serviceId');
  }

  const service = await findServiceById(serviceId);
  if (!service) throw new Error('Service not found');

  const result: any[] = [];

  const duration = service.duration;
  const staffList = await findStaffByServiceId(serviceId);

  for (const staff of staffList) {
    // 🔥 Normalize staff leave days
    const normalizedLeaveDays = staff.leaveDays.map(d => normalizeDate(d));

    // 🚫 Skip staff on leave
    if (normalizedLeaveDays.includes(date)) continue;

    const bookings = await findBookingsByStaffAndDate(staff._id, date);

    const bookedSlots = bookings.map(b => {
      const [sh, sm] = b.startTime.split(':').map(Number);
      const [eh, em] = b.endTime.split(':').map(Number);
      return {
        start: sh * 60 + sm,
        end: eh * 60 + em,
      };
    });

    let start = WORK_START;

    // ⏱ TODAY LOGIC
    if (isToday(date)) {
      const nowMinutes = getCurrentMinutes();
      start = Math.max(start, nowMinutes);
      start = roundUpToQuarter(start);
    }

    const slots: string[] = [];

    for (; start + duration <= WORK_END; start += 15) {
      const end = start + duration;

      const hasConflict = bookedSlots.some(b => isOverlap(start, end, b.start, b.end));

      if (!hasConflict) {
        slots.push(`${minutesToTime(start)} to ${minutesToTime(end)}`);
      }
    }

    if (slots.length > 0) {
      result.push({
        staffId: staff._id,
        name: staff.name,
        date : date,
        slots,
      });
    }
  }

  return result;
};
