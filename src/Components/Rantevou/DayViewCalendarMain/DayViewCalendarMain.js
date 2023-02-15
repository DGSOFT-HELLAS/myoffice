import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { DayContext } from "../../../useContext/daysContext";
import { fetchAPI } from "../../../utils/fetchAPI";
import { UserContext } from "../../../useContext/useContect";
import ModalFullEvent from "./ModalView";
import { TimelineCalendar } from '@howljs/calendar-kit'
import { COLORS } from "../../../shared/COLORS";
import BoldText from "../../Atoms/Text/BoldText";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import DayViewCalendarHeader from "./DayViewCalendarHeader";
import ColorLoader from "./ColorLoader";

const DayViewCalendarMain = () => {
  const { day, setDay } = useContext(DayContext)

  const route = useRoute()
  const navigation = useNavigation()
  const { trdr } = useContext(UserContext)
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  // const [headerDate, setHeaderDate] = useState(route.params.date)
  const [state, setState] = useState({
    delete: false,
    loading: true,
    refresh: false,
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
      stelexos: 0
    })
    console.log(res)
    const updatedData = res.map(item => ({ ...item, id: item.soaction, start: new Date(item.start), end: new Date(item.end), title: item.title, style: item.color }));
    setEvents(updatedData)

    setState(prev => {
      return {
        ...prev, loading: false,
      }
    })
  }

  useEffect(() => {
    handleFetch()

  }, [day, state.delete, state.refresh])




  const onDragCreateEnd = (event) => {
    let date = event.start.split('T')[0]
    let start = event.start.split('T')[0] + 'T' + new Date(event.start).toLocaleTimeString()
    let end = event.end.split('T')[0] + 'T' + new Date(event.end).toLocaleTimeString()
    navigation.navigate('AddRantevou', { start: start, end: end, date: date })

  };


  return (
    <View style={styles.container}>
      <DayViewCalendarHeader date={day} setState={setState} state={state} />
      {/* <ColorLoader loading={state.loading} /> */}
      <TimelineCalendar
        viewMode="day"
        isShowHeader={false}
        // initialDate={route.params ? route.params.date : new Date().toISOString().split('T')[0]}
        initialDate={day}
        events={events}
        isLoading={state.loading}
        onDateChanged={(date) => {
          setDay(date)
        }}
        locale="gr"
        timeInterval={60}
        start={6}
        // locale="gr"
        initialTimeIntervalHeight={120}
        overlapEventsSpacing={2}
        containerStyle={styles.customItem}
        renderEventContent={(event) => eventItem(event)}
        onPressEvent={(evt) => {
          const obj = Object.keys(evt)
            .filter((key) => {
              return key !== 'duration' && key !== 'height' && key !== 'top' && key !== 'left' && key !== 'leftByIndex' && key !== 'width' && key !== 'startHour'
            })
            .reduce((obj, key) => {
              return Object.assign(obj, {
                [key]: evt[key]
              });
            }, {});

          setEvent(obj)
          setIsVisible(true)
        }}
        allowDragToCreate
        dragCreateInterval={30}
        onDragCreateEnd={(e) => onDragCreateEnd(e)}

      />

      <ModalFullEvent event={event} isVisible={isVisible} setIsVisible={setIsVisible} state={state} setState={setState} />
    </View>
  )


}

const eventItem = (event) => {
  return (
    <View style={[styles.customItem]}>
      <BoldText style={styles.eventText}>{`${event["'Ωρα"]}`}</BoldText>
      <Text style={styles.eventText}>{` - ${event.title}`}</Text>
    </View>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  customItem: {
    padding: 2,
    height: '100%',
    paddingLeft: 5,
    borderLeftWidth: 4,
    borderLeftColor: 'green',
    backgroundColor: COLORS.secondaryColorShade003,
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 1,
  },
  limeGreen: {
    backgroundColor: '#1fb90e',
    padding: 4,
  },

  eventText: {
    fontSize: 11,
    color: 'black'
  },
  lightSteelBlue: {
    backgroundColor: '#718FCE',
  },
  limeGreen: {
    backgroundColor: '#2ab61a',
  },
  silver: {
    backgroundColor: 'silver',
  },
  lightred: {
    backgroundColor: 'red',
  },
  pink: {
    backgroundColor: 'pink',
  },
  orange: {
    backgroundColor: 'orange',
  }
})

export default DayViewCalendarMain;