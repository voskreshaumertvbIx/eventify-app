export const generateAvailableTimes = (): string[] => {
  const times: string[] = [];
  const startTime = new Date(0, 0, 0, 0, 0);
  for (let i = 0; i < 48; i++) {
    const hours = String(startTime.getHours()).padStart(2, "0");
    const minutes = String(startTime.getMinutes()).padStart(2, "0");
    times.push(`${hours}:${minutes}`); 
    startTime.setMinutes(startTime.getMinutes() + 30); 
  }
  return times;
};

export const filterAvailableEndTimes = (
  startTime: string | null,
  availableTimes: string[]
): string[] => {
  if (!startTime) return availableTimes;

  const start = new Date(`1970-01-01T${startTime}:00Z`);
  return availableTimes.filter((time) => {
    const end = new Date(`1970-01-01T${time}:00Z`);
    return end > start; 
  });
};
