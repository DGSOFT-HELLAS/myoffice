import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { DayContext } from "../../../useContext/daysContext";
import { fetchAPI } from "../../../utils/fetchAPI";
import { UserContext } from "../../../useContext/useContect";
import ModalFullEvent from "./ModalView";
import { EventItem, HighlightDates, OnChangeProps, PackedEvent, RangeTime, TimelineCalendar, TimelineCalendarHandle, UnavailableItemProps, } from '@howljs/calendar-kit'
import { COLORS } from "../../../shared/COLORS";
import BoldText from "../../Atoms/Text/BoldText";




const DayViewCalendarMain = () => {
  const { day } = useContext(DayContext)
  const { trdr } = useContext(UserContext)
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  // console.log('day from context:' + day)
  // console.log(new Date('2023-02-09 10:30'))
  const handleFetch = async () => {

    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      query: 'wpFetchRDVForCalendar',
      startDate: day,
      endDate: '',
      trdr: trdr,
      stelexos: 0
    })
    const updatedData = res.map(item => ({ ...item, id: item.soaction, start: new Date(item.start), end: new Date(item.end), title: item.title, style: item.color }));
    console.log('--------- UPDATED DATA ---------------')
    console.log(res)
    setEvents(updatedData)
  }

  useEffect(() => {
    handleFetch()
  }, [day])

  const onDragCreateEnd = (event) => {
    const randomId = Math.random().toString(36).slice(2, 10);
    const newEvent = {
      id: randomId,
      title: randomId,
      start: event.start,
      end: event.end,
      color: '#A3C7D6',
    };
    setEvents((prev) => [...prev, newEvent]);
  };
  return (
    <View style={styles.container}>
      <TimelineCalendar
        viewMode="day"
        events={events}
        // locale="gr"
        initialDate={day}
        timeInterval={60}
        start={6}
        locale="gr"
        initialTimeIntervalHeight={120}
        overlapEventsSpacing={2}
        containerStyle={styles.customItem}
        renderEventContent={(event) => eventItem(event)}
        onPressEvent={(evt) => {
          setEvent(evt)
          setIsVisible(true)
        }}
        onPressBackground={(time) => {
          console.log(new Date(time))
        }}
        renderSelectedEventContent
        onPressDayNum={(e) => console.log(e)}
        allowDragToCreate
        dragCreateInterval={30}
        onDragCreateEnd={(e) => console.log(e)}
      />

      <ModalFullEvent event={event} isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  )


}

const eventItem = (event) => {
  console.log('--------- EVENT ----------');
  return (
    <View style={[
      styles.customItem,

    ]}>
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
    alignItems: 'center',
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