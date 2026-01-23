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
  timeToMinutes,
} from '../../utils/helper';
import holyDayModel from '../../models/holyDayModel';

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
  date = normalizeDate(date);
  const timeDetails = await holyDayModel.findOne();
  if (!timeDetails) return [];
  const startTime = timeDetails.openingHours;
  const endTime = timeDetails.closingHours;
  const WORK_START = timeToMinutes(startTime);
  const WORK_END = timeToMinutes(endTime);

  if (isPastDate(date)) return [];

  if (!Types.ObjectId.isValid(serviceId)) {
    throw new Error('Invalid serviceId');
  }

  const service = await findServiceById(serviceId);
  if (!service) throw new Error('Service not found');

  const duration = service.duration;
  const staffList = await findStaffByServiceId(serviceId);
  const result: any[] = [];

  for (const staff of staffList) {
    const normalizedLeaveDays = (staff.leaveDays ?? []).map(d => normalizeDate(d));
    const normalizedWeeklyOffDays = (staff.weeklyOffDays ?? []).map(d => normalizeDate(d));
    const normalizedHolidays = (staff.holidayDays ?? []).map(d => normalizeDate(d));

    if (normalizedLeaveDays.includes(date)) {
      return {
        success: false,
        message: `${staff.name} is on leave on ${date}`,
      };
    }

    if (normalizedWeeklyOffDays.includes(date)) {
      return {
        success: false,
        message: `${staff.name} has a weekly off on ${date}`,
      };
    }

    if (normalizedHolidays.includes(date)) {
      return {
        success: false,
        message: `${staff.name} is on holiday on ${date}`,
      };
    }

    const bookings = await findBookingsByStaffAndDate(staff._id, date);

    const bookedSlots = bookings.map(b => ({
      start: b.startMinutes,
      end: b.endMinutes,
    }));

    let start = WORK_START;

    if (isToday(date)) {
      const nowMinutes = roundUpToQuarter(getCurrentMinutes());
      start = Math.max(start, nowMinutes);
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
        date,
        slots,
      });
    }
  }

  return result;
};
