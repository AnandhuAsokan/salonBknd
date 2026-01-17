import holyDayModel from "../models/holyDayModel";
import staffModel from "../models/staffModel";

export const createNameAlias = (name: string) => {
  return name.toLowerCase().replace(/ /g, '_');
};

export const normalizeDate = (date: string) => {
  if (date.includes("/")) {
    const parts = date.split("/");
    if (parts[0].length === 4) {
      const [yyyy, mm, dd] = parts;
      return `${yyyy}-${mm}-${dd}`;
    }
  }

  return date;
};

export const roundUpToQuarter = (minutes: number) => {
  return Math.ceil(minutes / 15) * 15;
};

export const getCurrentMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

export const isToday = (date: string) => {
  const today = new Date().toISOString().split("T")[0];
  return date === today;
};

export const isPastDate = (date: string) => {
  const today = new Date().toISOString().split("T")[0];
  return date < today;
};

export const getDatesOfWeekdayForCurrentYear = (weekday: number): string[] => {
  const dates: string[] = [];
  const year = new Date().getFullYear();

  let date = new Date(year, 0, 1);

  while (date.getDay() !== weekday) {
    date.setDate(date.getDate() + 1);
  }

  while (date.getFullYear() === year) {
    dates.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() + 7);
  }

  return dates;
};

export const weekdayMap: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};

const normalizeDate1 = (date: string) =>
  new Date(date).toISOString().split('T')[0];

const isPastDate1 = (date: string) =>
  new Date(date) < new Date(new Date().toDateString());

export const addHolidayService = async (date: string) => {
  if (!date) throw new Error('Holiday date is required');

  const normalizedDate = normalizeDate1(date);

  if (isPastDate1(normalizedDate)) {
    throw new Error('Cannot add past holiday');
  }

  const holidaySettings = await holyDayModel.findOne();
  if (!holidaySettings) {
    throw new Error('Holiday settings not initialized');
  }

  if (holidaySettings.holidayDays.includes(normalizedDate)) {
    throw new Error('Holiday already exists');
  }

  await holyDayModel.updateOne(
    {},
    { $addToSet: { holidayDays: normalizedDate } }
  );

  await staffModel.updateMany(
    {},
    { $addToSet: { holidayDays: normalizedDate } }
  );

  return normalizedDate;
};

export const timeToMinutes = (time: string): number => {
  const match = time.trim().toLowerCase().match(/^(\d{1,2}):(\d{2})(am|pm)$/);

  if (!match) {
    throw new Error(`Invalid time format: ${time}`);
  }

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3];

  if (period === 'am' && hour === 12) hour = 0;
  if (period === 'pm' && hour !== 12) hour += 12;

  return hour * 60 + minute;
};
