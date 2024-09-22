export default function ISOdateToTime(date: Date): {
  time: string;
  period: string;
} {
  if (!date) {
    return {
      time: '',
      period: '',
    };
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const convertedHours = hours % 12 || 12; // Convert 0 to 12

  return {
    time: `${convertedHours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`,
    period: period,
  };
}
