const days = ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ',]
const months = ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαϊ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"];
import { getDate, getMonth, getFullYear, getISODay } from 'date-fns';

import { utcToZonedTime, format } from 'date-fns-tz';





const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';


export const constructGreekDate = (date) => {

  const d = new Date(date);
  const zonedDate = utcToZonedTime(d, timeZone);
  const day = getISODay(d)
  console.log(day)
  const dayOfMonth = getDate(zonedDate); // Returns 22
  const month = getMonth(zonedDate); // Returns 1 (February, zero-indexed)
  return `${days[day - 1]} ${dayOfMonth} ${months[month]}`

}