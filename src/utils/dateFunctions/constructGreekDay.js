const days = ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ'];
const months = [
  'Ιαν',
  'Φεβ',
  'Μαρ',
  'Απρ',
  'Μαϊ',
  'Ιουν',
  'Ιουλ',
  'Αυγ',
  'Σεπ',
  'Οκτ',
  'Νοε',
  'Δεκ',
];
import {getDate, getMonth, getISODay} from 'date-fns';

import {formatInTimeZone} from 'date-fns-tz';
const timeZoneOffset = '+02:00';

export const constructGreekDate = date => {
  const zonedDate = formatInTimeZone(
    date,
    timeZoneOffset,
    'yyyy-MM-dd HH:mm:ss',
  );
  const day = getISODay(zonedDate);
  const dayOfMonth = getDate(zonedDate); // Returns 22
  const month = getMonth(zonedDate); // Returns 1 (February, zero-indexed)
  return `${days[day - 1]} ${dayOfMonth} ${months[month]}`;
};
