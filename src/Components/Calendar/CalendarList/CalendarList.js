import { CalendarList } from 'react-native-calendars';
import { useState, useEffect, useContext } from 'react';
import { fetchAPI } from '../../../utils/fetchAPI';
import { UserContext } from '../../../useContext/useContect';
import { DayContext } from '../../../useContext/daysContext';
import { useNavigation } from '@react-navigation/native';
// import Locales from '../Locales';

const CalendarMonthList = ({ state, setState }) => {

  // const handleFetch = async () => {
  //   let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
  //     query: 'wpFetchRDVForCalendar',
  //     startDate: state.startDate,
  //     endDate: state.endDate,
  //     trdr: trdr,
  //     stelexos: state.stelexos

  //   })
  //   const items = {};
  //   for (let event of res) {
  //     if (!items[key]) {
  //       items[key] = {};
  //     }
  //     const key = new Date(event.start).toISOString().split('T')[0]
  //     items[key] = { marked: true, dotColor: 'green', activeOpacity: 0 }
  //   }
  //   console.log(items)
  //   setEvents(items)
  // }



  // useEffect(() => {
  //   var today = new Date();
  //   const firstDateOfMonth = format(today, 'yyyy-MM-01')
  //   const lastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd')
  //   setState((prev) => {
  //     return {
  //       ...prev, startDate: firstDateOfMonth, endDate: lastDateOfMonth
  //     }
  //   })
  // }, [])
  // useEffect(() => {
  //   handleFetch();
  // }, [state.startDate, state.endDate])




  return (
    <CalendarList
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={4}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={4}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // Enable or disable vertical scroll indicator. Default = false
      onDayPress={(day) => {
        setState((prev) => {
          return {
            ...prev, showList: false, startDate: day.dateString,
          }
        })
      }}
    />

  )
}

export default CalendarMonthList;