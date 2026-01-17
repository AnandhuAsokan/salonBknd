export const createNameAlias = (name: string) => {
  return name.toLowerCase().replace(/ /g, '_');
};

export const normalizeDate = (date: string) => {
  // YYYY/MM/DD → YYYY-MM-DD
  if (date.includes("/")) {
    const parts = date.split("/");
    if (parts[0].length === 4) {
      // YYYY/MM/DD
      const [yyyy, mm, dd] = parts;
      return `${yyyy}-${mm}-${dd}`;
    }
  }

  // already correct
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
