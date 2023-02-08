import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import HorizontalWeekView from "./HorizontalWeekCalendar";
import VerticalWeekView from "./VerticalWeekCalendar";
import { DayContext } from "../../../useContext/daysContext";
import { splitDate } from "../../../utils/dateFunctions/splitDate";
import { month } from "../../../shared/months";
import { days } from "../../../shared/months";
import { fetchAPI } from "../../../utils/fetchAPI";
import { UserContext } from "../../../useContext/useContect";
import Spinner from "../../Atoms/ActivityIndicator";
import { useNavigation } from "@react-navigation/native";
import { Provider } from "react-native-paper";

import ModalPersons from "../Modal";
const currentDate = new Date();


// Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
const currentDayOfWeek = currentDate.getDay();
// // Calculate the number of days until the next Sunday
const daysUntilNextSunday = 7 - currentDayOfWeek;
// // Calculate the number of days until the last Monday
const daysUntilLastMonday = currentDayOfWeek - 1;

const createStringMonth = (monday, sunday) => {
  return monday.getDate() + "/" + month[monday.getMonth()] + " - " + sunday.getDate() + "/" + month[sunday.getMonth()] + " " + monday.getFullYear();
}


const WeekViewCalendar = () => {

  const { trdr } = useContext(UserContext)
  const navigation = useNavigation()
  const [state, setState] = useState({
    data: [],
    loading: false,
    delete: false,
    week: '',
    today: '',
    monday: '',
    sunday: '',
    displayMonth: '',
  })

  // console.log('--------------------------- STATEEEE _________________')
  // console.log(state)


  const [raw, setRaw] = useState({
    stelexos: 0,
  })



  const commonWeekView = (monday, sunday) => {

    setState(prev => {
      return { ...prev, monday: monday, sunday: sunday }
    })

    let m = createStringMonth(monday, sunday);
    setState(prev => {
      return { ...prev, displayMonth: m }
    })


    monday = splitDate(monday)
    handleCalendar(monday)

  }



  const handleStartEndWeek = () => {

    // Calculate the next Sunday by adding the number of days until the next Sunday to the current date
    let nextSunday = new Date(currentDate.getTime() + (daysUntilNextSunday * 24 * 60 * 60 * 1000));
    let lastMonday = new Date(currentDate.getTime() - (daysUntilLastMonday * 24 * 60 * 60 * 1000));
    let m = createStringMonth(lastMonday, nextSunday);
    setState(prev => {
      return { ...prev, monday: lastMonday, sunday: nextSunday, today: currentDate, displayMonth: m }
    })






    lastMonday = splitDate(lastMonday)
    nextSunday = splitDate(nextSunday)
    handleCalendar(lastMonday);

  }




  const handleNextWeek = () => {

    let mon = new Date(state.monday)
    let sun = new Date(state.monday)
    let nextMonday = new Date(mon.getTime() + (7 * 24 * 60 * 60 * 1000));
    let nextSunday = new Date(sun.getTime() + (13 * 24 * 60 * 60 * 1000));
    console.log(nextMonday, nextSunday)
    commonWeekView(nextMonday, nextSunday)
  }


  const handlePreviousWeek = () => {
    let mon = new Date(state.monday)
    let prevMonday = new Date(mon.getTime() - (7 * 24 * 60 * 60 * 1000));
    let prevSunday = new Date(mon.getTime() - (1 * 24 * 60 * 60 * 1000));
    console.log(prevMonday, prevSunday)
    commonWeekView(prevMonday, prevSunday)

  }






  const handleCalendar = (monday) => {
    let calendar = [];
    for (i = 0; i < 7; i++) {
      let nextday = new Date(monday);

      nextday.setDate(nextday.getDate() + i)
      calendar.push(nextday)


    }
    setState(prev => {
      return { ...prev, week: calendar }
    })



  }



  const handleFetch = async () => {
    setState(prev => {
      return {
        ...prev, loading: true,
      }
    })
    let res;
    if (state.monday !== '' && state.sunday !== '') {
      res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
        query: 'wpFetchRDVForCalendar',
        startDate: state.monday,
        endDate: state.sunday,
        trdr: trdr,
        stelexos: raw.stelexos

      })
      setState(prev => {
        return {
          ...prev, data: res, loading: false,
        }
      })
    }



  }



  useEffect(() => {
    handleFetch();

    const unsubscribe = navigation.addListener('focus', () => {
      handleStartEndWeek()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [state.delete, state.monday, state.sunday, raw.stelexos, navigation])



  useEffect(() => {
    handleStartEndWeek()
  }, []);







  return (
    <Provider >
      <ModalPersons title={"Στέλεχος"} query="GetPersons" setState={setRaw} updateValue={"stelexos"} hideLabel={true} />
      <HorizontalWeekView
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
        days={days}
        today={state.today}
        week={state.week}
        displayMonth={state.displayMonth}
        data={state.data}
      />
      {state.loading ? <Spinner /> : <VerticalWeekView week={state.week} days={days} data={state.data} loading={state.loading} setState={setState} state={state} />}

    </Provider >

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 10,
  }
});


export default WeekViewCalendar;