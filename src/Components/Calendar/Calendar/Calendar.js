import {Calendar} from 'react-native-calendars';
import React, {useState, useEffect, useContext} from 'react';
import {fetchAPI} from '../../../utils/fetchAPI';
import {UserContext} from '../../../useContext/userContext';
import {format, lastDayOfMonth} from 'date-fns';
import {DayContext} from '../../../useContext/daysContext';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import isoDate from '../../../utils/dateFunctions/isoDate';

const today = new Date();
const firstDateOfMonth = format(today, 'yyyy-MM-01');
const lastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd');

const CalendarMonth = () => {
  const {trdr} = useContext(UserContext);
  const {setDay} = useContext(DayContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [events, setEvents] = useState();
  const [state, setState] = useState({
    startDate: firstDateOfMonth,
    endDate: lastDateOfMonth,
    stelexos: 0,
  });

  const handleFetch = async () => {
    let res = await fetchAPI(
      'https://portal.myoffice.com.gr/mobApi/queryIncoming.php',
      {
        query: 'wpFetchRDVMonth',
        startDate: state.startDate,
        endDate: state.endDate,
        trdr: trdr,
        stelexos: state.stelexos,
      },
    );
    const items = {};
    for (let event of res) {
      if (!items[key]) {
        items[key] = {};
      }
      const key = isoDate(event.RDVdate);

      items[key] = {marked: true, dotColor: 'green', activeOpacity: 0};
    }
    setEvents(items);
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <>
      <Calendar
        markedDates={events}
        firstDay={1}
        onMonthChange={month => {
          let mToday = new Date(month.dateString);
          let mFirstDateOfMonth = format(mToday, 'yyyy-MM-01');
          let mLastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd');
          setState(prev => {
            return {
              ...prev,
              startDate: mFirstDateOfMonth,
              endDate: mLastDateOfMonth,
            };
          });
        }}
        onDayPress={day => {
          let date = day.dateString;
          setDay(date);
          navigation.navigate('DayViewCalendarMain', {date: date});
        }}
      />
    </>
  );
};

export default CalendarMonth;
