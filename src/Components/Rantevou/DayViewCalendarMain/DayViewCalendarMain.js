import React, { useEffect, useState, useContext, useCallback, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DayContext } from "../../../useContext/daysContext";
import { fetchAPI } from "../../../utils/fetchAPI";
import { UserContext } from "../../../useContext/useContect";
import { CalendarContainer, CalendarBody } from '@howljs/calendar-kit'
import BoldText from "../../Atoms/Text/BoldText";
import { useNavigation, useRoute } from "@react-navigation/native";
import DayViewCalendarHeader from "./DayViewCalendarHeader";
import ModalPersons from "../Modal";
import { Provider } from "react-native-paper";
import { format, toZonedTime } from 'date-fns-tz';

import EventScreen from "../EventScreen/EventScreen";
const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';

const toAthensDateOnly = (value) => {
  if (typeof value !== 'string') return null
  // calendar-kit may emit ISO with Z/offset; normalize to yyyy-MM-dd in Athens
  if (value.includes('T')) {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return null
    return format(toZonedTime(d, timeZone), 'yyyy-MM-dd', { timeZone, timeZoneOffset })
  }
  if (value.length >= 10) return value.slice(0, 10)
  return null
}

const DayViewCalendarMain = () => {
  const { day, setDay, setSingleEvent } = useContext(DayContext)
  // console.log(day)
  const navigation = useNavigation()
  const route = useRoute()
  const { trdr } = useContext(UserContext)
  const calendarRef = useRef(null)
  const lastAppliedRouteDateRef = useRef(null)
  const hasLoadedRef = useRef(false)
  const routeDateLockRef = useRef(null)
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const routeDate = route?.params?.date
  const initialDate =
    (typeof routeDate === 'string' && routeDate.length >= 10 ? routeDate : null) ??
    (typeof day === 'string' && day.length >= 10 ? day : null) ??
    format(toZonedTime(new Date(), timeZone), 'yyyy-MM-dd', { timeZone, timeZoneOffset })

  const [visibleDate, setVisibleDate] = useState(initialDate)


  const [state, setState] = useState({
    delete: false,
    loading: true,
    refresh: false,
    stelexos: 0
  })

  // Sync when arriving from month (screen may already be mounted).
  // Important: do NOT fight user swipes; only react when route param changes.
  useEffect(() => {
    const next = toAthensDateOnly(routeDate)
    if (!next) return
    if (lastAppliedRouteDateRef.current === next) return

    lastAppliedRouteDateRef.current = next
    routeDateLockRef.current = next
    setVisibleDate(next)
    setDay(next)
    // if calendar isn't loaded yet, we'll goToDate in onLoad
    if (hasLoadedRef.current) {
      calendarRef.current?.goToDate?.({ date: next, animatedDate: false, hourScroll: false })
    }
  }, [routeDate, setDay])



  const handleFetch = async () => {
    setState(prev => {
      return {
        ...prev, loading: true,
      }
    })

    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      query: 'wpFetchRDVForCalendar',
      startDate: visibleDate,
      endDate: '',
      trdr: trdr,
      stelexos: state.stelexos
    })
    const updatedData = (Array.isArray(res) ? res : []).map((item) => {
      const id = String(item?.soaction ?? item?.id ?? '')

      const start =
        item?.start && typeof item.start === 'object'
          ? item.start
          : typeof item?.start === 'string'
            ? { dateTime: item.start, timeZone }
            : { date: String(visibleDate).slice(0, 10) }

      const end =
        item?.end && typeof item.end === 'object'
          ? item.end
          : typeof item?.end === 'string'
            ? { dateTime: item.end, timeZone }
            : { date: String(visibleDate).slice(0, 10) }

      return {
        ...item,
        id,
        start,
        end,
        title: item?.title,
        color: item?.color,
      }
    });
    setEvents(updatedData)

    setState(prev => {
      return {
        ...prev, loading: false,
      }
    })
  }
  console.log({ events }, { visibleDate })
  useEffect(() => {
    handleFetch()
    console.log('handle fetch -> inside')
    const unsubscribe = navigation.addListener('focus', () => {
      handleFetch()
    });

    return unsubscribe;

  }, [visibleDate, state.delete, state.stelexos, navigation, state.refresh])

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

  const onPressBackground = (props) => {
    const startIso = props?.dateTime
    if (typeof startIso !== 'string') return
    const startDate = new Date(startIso)
    if (Number.isNaN(startDate.getTime())) return
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000)
    const date = format(toZonedTime(startDate, timeZone), 'yyyy-MM-dd', { timeZone, timeZoneOffset })
    navigation.navigate('AddRantevou', { start: startIso, end: endDate.toISOString(), date })
  }

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
          <DayViewCalendarHeader date={visibleDate} setState={setState} state={state} />
          <View style={styles.calendarWrap}>
            <CalendarContainer
              ref={calendarRef}
              numberOfDays={1}
              initialDate={visibleDate}
              events={events}
              onLoad={() => {
                hasLoadedRef.current = true
                // Ensure we land on the intended day (route tap or last visibleDate)
                calendarRef.current?.goToDate?.({ date: visibleDate, animatedDate: false, hourScroll: false })
              }}
              onDateChanged={(d) => {
                if (!hasLoadedRef.current) return
                const next = toAthensDateOnly(d) ?? visibleDate
                const locked = routeDateLockRef.current
                if (typeof locked === 'string' && locked.length >= 10 && next !== locked) {
                  return
                }
                if (next === locked) {
                  routeDateLockRef.current = null
                }
                setVisibleDate(next)
                setDay(next)
              }}
              spaceFromTop={50}
              locale="gr"
              timeZone={timeZone}
              allowHorizontalSwipe
              scrollByDay
              scrollToNow={false}
              timeInterval={60}
              start={4 * 60}
              end={24 * 60}
              initialTimeIntervalHeight={120}
              overlapEventsSpacing={2}
              onPressEvent={onPressEvent}
              onPressBackground={onPressBackground}
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