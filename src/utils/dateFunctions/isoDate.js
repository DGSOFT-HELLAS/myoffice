import {format} from 'date-fns-tz';

const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';

const isoDate = (date, time) => {
  return format(date, time ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd', {
    timeZone,
    timeZoneOffset,
  });
};

export default isoDate;
