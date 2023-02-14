import { Calendar } from 'react-native-calendars';
import { useState, useEffect, useContext } from 'react';
import { fetchAPI } from '../../../utils/fetchAPI';
import { UserContext } from '../../../useContext/useContect';
import { format, lastDayOfMonth } from 'date-fns'
import { DayContext } from '../../../useContext/daysContext';
import { useNavigation } from '@react-navigation/native';
// import Locales from '../Locales';

const CalendarMonth = () => {
  const { trdr } = useContext(UserContext)
  const { setDay, day } = useContext(DayContext)
  const navigation = useNavigation()
  const [events, setEvents] = useState()
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: '',
    stelexos: 0,
  })

  console.log('day in calendar view ' + day)

  const handleFetch = async () => {
    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      query: 'wpFetchRDVForCalendar',
      startDate: state.startDate,
      endDate: state.endDate,
      trdr: trdr,
      stelexos: state.stelexos

    })
    console.log(res)
    const items = {};
    for (let event of res) {
      if (!items[key]) {
        items[key] = {};
      }
      const key = new Date(event.start).toISOString().split('T')[0]
      items[key] = { marked: true, dotColor: 'green', activeOpacity: 0 }
    }
    // console.log(items)
    setEvents(items)
  }



  useEffect(() => {
    var today = new Date();
    const firstDateOfMonth = format(today, 'yyyy-MM-01')
    const lastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd')
    setState((prev) => {
      return {
        ...prev, startDate: firstDateOfMonth, endDate: lastDateOfMonth
      }
    })
  }, [])


  useEffect(() => {
    handleFetch();
  }, [state.startDate, state.endDate])




  return (
    <Calendar
      markedDates={events}
      onMonthChange={month => {
        let today = new Date(month.dateString);
        const firstDateOfMonth = format(today, 'yyyy-MM-01')
        const lastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd')
        setState((prev) => {
          return {
            ...prev, startDate: firstDateOfMonth, endDate: lastDateOfMonth
          }
        })
      }}
      onDayPress={(day) => {
        let date = day.dateString
        console.log(date)
        let date2 = `${day.year}-${day.month}-${day.day}`
        console.log(day)
        navigation.navigate('DayViewCalendarMain', { date: date })
      }}
    />

  )
}

export default CalendarMonth;