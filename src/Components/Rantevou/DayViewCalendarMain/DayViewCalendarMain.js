import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { DayContext } from "../../../useContext/daysContext";
import { fetchAPI } from "../../../utils/fetchAPI";
import { UserContext } from "../../../useContext/useContect";
import ModalFullEvent from "./ModalView";
import { EventItem, HighlightDates, OnChangeProps, PackedEvent, RangeTime, TimelineCalendar, TimelineCalendarHandle, UnavailableItemProps, } from '@howljs/calendar-kit'
import { COLORS } from "../../../shared/COLORS";
import BoldText from "../../Atoms/Text/BoldText";
import { ModalDatePickerComp } from "../../DatePickers/ModalDatePicker";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const DayViewCalendarMain = () => {
  const { day, setDay } = useContext(DayContext)
  const route = useRoute()

  const navigation = useNavigation()
  const { trdr } = useContext(UserContext)
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [state, setState] = useState({
    delete: false,
    loading: false,
    day: new Date().toISOString().split('T')[0]
  })

  console.log(day)
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
    // console.log(res)
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
  }, [day, state.delete])




  const onDragCreateEnd = (event) => {
    let date = event.start.split('T')[0]
    navigation.navigate('AddRantevou', { start: event.start, end: event.end, date: date })

  };
  return (
    <View style={styles.container}>
      <TimelineCalendar
        viewMode="day"
        initialDate={route.params.date}
        events={events}
        isLoading={state.loading}
        onDateChanged={(date) => {
          console.log('date changed')
          console.log(date)
        }}
        // locale="gr"

        timeInterval={60}
        start={6}
        locale="gr"
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
        onChange={(day) => {
          console.log('on change happended')
          setDay(day.date)
        }}
        onPressDayNum={(e) => console.log(e)}
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