import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DayContext } from "../../../useContext/daysContext";
import { fetchAPI } from "../../../utils/fetchAPI";
import { UserContext } from "../../../useContext/useContect";
import { CalendarContainer, CalendarBody } from '@howljs/calendar-kit'
import BoldText from "../../Atoms/Text/BoldText";
import { useNavigation } from "@react-navigation/native";
import DayViewCalendarHeader from "./DayViewCalendarHeader";
import ModalPersons from "../Modal";
import { Provider } from "react-native-paper";
import { format } from 'date-fns-tz';

import EventScreen from "../EventScreen/EventScreen";
const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';

const DayViewCalendarMain = () => {
  const { day, setDay, setSingleEvent } = useContext(DayContext)
  // console.log(day)
  const navigation = useNavigation()
  const { trdr } = useContext(UserContext)
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState([])
  const [isVisible, setIsVisible] = useState(false)


  const [state, setState] = useState({
    delete: false,
    loading: true,
    refresh: false,
    stelexos: 0
  })



  const handleFetch = async () => {
    setState(prev => {
      return {
        ...prev, loading: true,
      }
    })

    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      query: 'wpFetchRDVForCalendar',
      startDate: day,
      endDate: '',
      trdr: trdr,
      stelexos: state.stelexos
    })
    console.log(res)
    const updatedData = res.map(item => ({ ...item, id: item.soaction, start: new Date(item.start), end: new Date(item.end), title: item.title, style: item.color, color: item.color }));
    setEvents(updatedData)

    setState(prev => {
      return {
        ...prev, loading: false,
      }
    })
  }

  useEffect(() => {
    handleFetch()
    console.log('handle fetch -> inside')
    const unsubscribe = navigation.addListener('focus', () => {
      handleFetch()
    });

    return unsubscribe;

  }, [day, state.delete, state.stelexos, navigation, state.refresh])

  const renderCalendarEvent = useCallback((ev) => eventItem(ev), []);

  const onDragCreateEnd = (dragPayload) => {
    const startIso = typeof dragPayload.start === 'string' ? dragPayload.start : dragPayload.start?.dateTime;
    const endIso = typeof dragPayload.end === 'string' ? dragPayload.end : dragPayload.end?.dateTime;
    if (!startIso || !endIso) return;
    const date = startIso.split('T')[0];
    const formattedStart = format(new Date(startIso), 'HH:mm', { timeZone, timeZoneOffset });
    const formattedEnd = format(new Date(endIso), 'HH:mm', { timeZone, timeZoneOffset });
    const start = `${date}T${formattedStart}`;
    const end = `${date}T${formattedEnd}`;
    navigation.navigate('AddRantevou', { start, end, date });
  };

  const onPressEvent = (evt) => {
    const obj = Object.keys(evt)
      .filter((key) => {
        return key !== 'duration' && key !== 'height' && key !== 'top' && key !== 'left' && key !== 'leftByIndex' && key !== 'width' && key !== 'startHour' && key !== '_internal' && key !== 'localId'
      })
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: evt[key]
        });
      }, {});

    setEvent(obj)
    setSingleEvent(obj)
    ///delete later
    setIsVisible(true)

  }



  return (
    <Provider>
      {!isVisible ? (
        <View style={styles.container}>
          <ModalPersons title={"Στέλεχος"} query="GetPersons" setState={setState} updateValue={"stelexos"} hideLabel={true} />
          <DayViewCalendarHeader date={day} setState={setState} state={state} />
          <View style={styles.calendarWrap}>
            <CalendarContainer
              numberOfDays={1}
              initialDate={day}
              events={events}
              onDateChanged={setDay}
              spaceFromTop={50}
              locale="gr"
              timeZone={timeZone}
              timeInterval={60}
              start={4 * 60}
              end={24 * 60}
              initialTimeIntervalHeight={120}
              overlapEventsSpacing={2}
              onPressEvent={onPressEvent}
              allowDragToCreate
              dragStep={30}
              onDragCreateEventEnd={onDragCreateEnd}
            >
              <CalendarBody renderEvent={renderCalendarEvent} />
            </CalendarContainer>
          </View>
        </View>
      ) : <EventScreen setIsVisible={setIsVisible} setState={setState} />}
    </Provider>
  )


}

const eventItem = (event) => {
  return (
    <View style={[
      styles.customItem,
      event.color === "LightSteelBlue" && styles.lightSteelBlue,
      event.color === "LimeGreen" && styles.limeGreen,
      event.color === "Silver" && styles.silver,
      event.color === "lightred" && styles.lightred,
      event.personal == 1 && styles.pink
    ]}>
      <BoldText style={styles.eventText}>{`${event["'Ωρα"]}`}</BoldText>
      <Text style={styles.eventText2}>{` - ${event.title}`}</Text>
    </View>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calendarWrap: {
    flex: 1,
    minHeight: 0,
  },
  customItem: {
    padding: 2,
    height: '100%',
    paddingLeft: 5,
    borderLeftWidth: 4,
    // borderLeftColor: 'green',
    backgroundColor: '#fbfbfb',
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 1,
    flexWrap: 'wrap'
  },
  limeGreen: {
    backgroundColor: '#1fb90e',
    padding: 4,
  },

  eventText: {
    fontSize: 11,
    color: 'black'
  },
  eventText2: {
    fontSize: 9,
    color: 'black'
  },
  lightSteelBlue: {
    borderLeftColor: '#718FCE',
  },
  limeGreen: {
    borderLeftColor: '#2ab61a',
  },
  silver: {
    borderLeftColor: 'silver',
  },
  lightred: {
    borderLeftColor: 'red',
  },
  pink: {
    borderLeftColor: 'pink',
  },
  orange: {
    borderLeftColor: 'orange',
  }
})

export default DayViewCalendarMain;