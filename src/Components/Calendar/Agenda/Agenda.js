import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TimelineCalendar } from '@howljs/calendar-kit';
import { Calendar, CalendarList, Agenda, AgendaEntry } from 'react-native-calendars';


const events = [
  { startDate: '2023-02-09', endDate: '2023-02-09', title: '1: this is an original title' },
  { startDate: '2023-02-09', endDate: '2023-02-09', title: '2: this is an original title' },
  { startDate: '2023-02-08', endDate: '2023-02-08', title: '3: this is an original title' },
  { startDate: '2023-02-08', endDate: '2023-02-08', title: '4: this is an original title' },
]


const AgendaCalendar = () => {
  const [initialDate, setInitialDate] = useState(new Date())
  const [data, setData] = useState({})



  const handleFetch = () => {
    //..fetchrequest

    // Object.keys(item).forEach(key => {
    //   events.map(event => {
    //     if (key == event.startDate) {
    //       values.push({
    //         title: event.title
    //       })
    //     }
    //   })
    // });
    // setData(item)
    const items = events.reduce((acc, event) => {
      const key = event.startDate;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(event);
      return acc;
    }, {});
    // console.log(items)
    setData(items)
  }
  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  useEffect(() => {
    handleFetch();
  }, [])
  return (
    <View style={styles.container}>
      <Agenda
        initialDate={'2023-02-09'}
        // items={data}
        selected={'2023-02-11'}
        pastScrollRange={2}
        futureScrollRange={2}
        items={data}
        showClosingKnob={false}

        // items={{
        //   '2023-02-09': [{ startDate: '2023-02-09', endDate: '2023-02-09', title: '1: this is an original title' }, { startDate: '2023-02-09', endDate: '2023-02-09', title: '2: this is an original title' }],
        //   '2023-02-08': [{ startDate: '2023-02-08', endDate: '2023-02-08', title: '3: this is an original title' }, { startDate: '2023-02-08', endDate: '2023-02-08', title: '4: this is an original title' }],
        // }}
        renderItem={(item, firstItemInDay) => {
          return (
            <RenderItem firstItemInDay={firstItemInDay} item={item} />
          )
        }}
        renderEmptyDate={() => <RenderEmptyDate />}
        loadItemsForMonth={month => {
          console.log('trigger items loading');
        }}

      />
    </View>
  )
}

const RenderItem = ({ item, firstItemInDay }) => {
  console.log(item)

  return (
    <View style={[styles.itemView, firstItemInDay && styles.firstItemInDay]}>
      <Text>
        {item.title}
      </Text>
    </View>
  )
}
const RenderEmptyDate = () => {

  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemView: {
    height: 80,
    width: '100%',
    backgroundColor: 'grey',
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  firstItemInDay: {
    marginTop: 30
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
})


export default AgendaCalendar;