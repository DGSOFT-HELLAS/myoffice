import { utcToZonedTime, format } from 'date-fns-tz';

const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';

const isoDate = (date) => {
  const zonedDate = utcToZonedTime(date, timeZone);
  const formattedDate = format(zonedDate, 'yyyy-MM-dd', { timeZone, timeZoneOffset });
  return formattedDate;
}

export default isoDate;





