import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DayContext } from "../../../useContext/daysContext";
import { fetchAPI } from "../../../utils/fetchAPI";
import { UserContext } from "../../../useContext/useContect";

import { EventItem, HighlightDates, OnChangeProps, PackedEvent, RangeTime, TimelineCalendar, TimelineCalendarHandle, UnavailableItemProps, } from '@howljs/calendar-kit'




const exampleEvents = [
  {
    id: '1',
    title: 'Event 1',
    start: new Date('2023-02-09 10:00'),
    end: new Date('2023-02-09 10:15'),
    color: '#A3C7D6',
  },
  {
    id: '2',
    title: 'Ραντεβού με καρδιολογολογολογολογλογ',
    start: new Date('2023-02-09 10:15'),
    end: new Date('2023-02-09 10:30'),
    color: '#B1AFFF',
  },
  {
    id: '23434',
    title: 'Ραντεβού με καρδιολογολογολογολογλογ',
    start: new Date('2023-02-09 10:15'),
    end: new Date('2023-02-09 10:30'),
    color: '#B1AFFF',
  },
  {
    id: '2343e546te4t4',
    title: 'Ραντεβού με καρδιολογολογολογολογλογ',
    start: new Date('2023-02-09 10:15'),
    end: new Date('2023-02-09 10:30'),
    color: '#B1AFFF',
  },
  {
    id: '3',
    title: 'Ραντεβού με καρδιολογολογολογολογλογ',
    start: new Date('2023-02-09 10:20'),
    end: new Date('2023-02-09 10:30'),
    color: '#B1AFFF',
  },
  {
    id: '4',
    title: 'Ραντεβού με καρδιολογολογολογολογλογ',
    start: new Date('2023-02-09 10:30'),
    end: new Date('2023-02-09 10:40'),
    color: '#B1AFFF',
  },
  {
    id: '5',
    title: 'Ραντεβού με καρδιολογολογολογολογλογ',
    start: new Date('2023-02-09 10:40'),
    end: new Date('2023-02-09 10:50'),
    color: '#B1AFFF',
  },


];

// console.log(exampleEvents)

const DayViewCalendarMain = () => {
  const { day } = useContext(DayContext)
  const { trdr } = useContext(UserContext)
  const [events, setEvents] = useState([])

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
    const updatedData = res.map(item => ({ id: item.soaction, start: new Date(item.start), end: new Date(item.end), title: item.title, style: item.color }));
    console.log('--------- UPDATED DATA ---------------')
    console.log(res)
    setEvents(updatedData)
  }

  useEffect(() => {
    handleFetch()
  }, [day])


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
      />
    </View>
  )


}

const eventItem = (event) => {
  if (event.style === 'LimeGreen') {
    return (
      <View style={[styles.customItem, styles.limeGreen]}>
        <Text style={styles.eventText}>{event.title}</Text>
      </View>
    )
  }
  if (event.style === 'LimeGreen') {
    return (
      <View style={[styles.customItem, styles.limeGreen]}>
        <Text style={styles.eventText}>{event.title}</Text>
      </View>
    )
  }


  else {
    return (
      <View style={[styles.customItem, styles.default]}>
        <Text style={styles.eventText}>{event.title}</Text>
      </View>
    )
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  customItem: {
    // marginVertical: 1,
    borderWidth: 0.2,
    borderColor: 'white',
    height: '100%'
  },
  limeGreen: {
    backgroundColor: '#1fb90e',
    padding: 4,
  },
  default: {
    backgroundColor: 'red'
  },
  eventText: {
    fontSize: 12,
  }
})

export default DayViewCalendarMain;