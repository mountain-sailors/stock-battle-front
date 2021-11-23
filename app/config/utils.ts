import { format, parse, differenceInDays } from 'date-fns';

export const getPercentByWinCondition = (winCondition: number) => {
  if (winCondition === 0 || winCondition === 1) {
    return '%';
  }
  return '';
};
export const getColorBySign = (value: number) => {
  const sign = Math.sign(value);
  if (sign === 1) return 'red.400';
  if (sign === -1) return 'blue.400';
  return 'black';
};
export const getRemainingDay = (startDate: string, endDate: string) => {
  const FORMAT = 'yyyy-MM-dd';
  const today = parse(format(new Date(), FORMAT), FORMAT, new Date());
  const parseStartDate = parse(startDate.split('T')[0], FORMAT, new Date());
  const parseEndDate = parse(endDate.split('T')[0], FORMAT, new Date());
  const diffDayByTotal = differenceInDays(parseEndDate, parseStartDate);
  const diffDayByToday = differenceInDays(today, parseStartDate);
  return {
    diffDay: diffDayByTotal - diffDayByToday,
    percent: Math.floor((diffDayByToday / diffDayByTotal) * 100),
  };
};
