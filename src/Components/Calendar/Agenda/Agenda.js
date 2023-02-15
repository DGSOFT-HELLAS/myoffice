import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, CalendarList, Agenda, AgendaEntry } from 'react-native-calendars';
import { fetchAPI } from "../../../utils/fetchAPI";
// import CalendarMonthList from "../CalendarList/CalendarList";
import { UserContext } from "../../../useContext/useContect";
import format from "date-fns/format";
import lastDayOfMonth from "date-fns/lastDayOfMonth";



const events = [
  { startDate: '2023-02-09', endDate: '2023-02-09', title: '1: this is an original title' },
  { startDate: '2023-02-09', endDate: '2023-02-09', title: '2: this is an original title' },
  { startDate: '2023-02-08', endDate: '2023-02-08', title: '3: this is an original title' },
  { startDate: '2023-02-08', endDate: '2023-02-08', title: '4: this is an original title' },
]





const AgendaCalendar = () => {
  const [initialDate, setInitialDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [data, setData] = useState({})
  const { trdr } = useContext(UserContext)

  const [state, setState] = useState({
    startDate: new Date(),
    endDate: '',
    stelexos: 0,
    showList: false
  })

  console.log(state)

  const handleFetch = async () => {
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

    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      query: 'wpFetchRDVForCalendar',
      startDate: state.startDate,
      endDate: state.endDate,
      trdr: trdr,
      stelexos: state.stelexos

    })
    console.log(res)

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


  useEffect(() => {
    let date = new Date()
    loadItemsForMonth(date)

  }, [])
  useEffect(() => {
    handleFetch();
  }, [state.startDate, state.endDate])

  const loadItemsForMonth = (month) => {
    let date = new Date(month)
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1)
    setState((prev) => {
      return {
        ...prev, startDate: firstDay, endDate: lastDay
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            setState((prev) => {
              return {
                ...prev, showList: !prev.showList
              }
            })
          }}
          style={styles.knobStyles}>
        </TouchableOpacity>

      </View>

      {!state.showList && (
        <Agenda
          initialDate={'2023-02-09'}
          firstDay={1}
          // items={data}
          selected={selectedDate}
          pastScrollRange={2}
          futureScrollRange={2}
          // items={data}
          // showClosingKnob={false}
          // minDate={'2012-05-10'}
          // maxDate={'2012-05-30'}
          hideKnob={true}
          items={{
            '2023-02-09': [{ startDate: '2023-02-09', endDate: '2023-02-09', title: '1: this is an original title' }, { startDate: '2023-02-09', endDate: '2023-02-09', title: '2: this is an original title' }],
            '2023-02-08': [{ startDate: '2023-02-08', endDate: '2023-02-08', title: '3: this is an original title' }, { startDate: '2023-02-08', endDate: '2023-02-08', title: '4: this is an original title' }],
            '2023-02-15': [{ startDate: '2023-02-15', endDate: '2023-02-15', title: '3: this is an original title' }, { startDate: '2023-02-15', endDate: '2023-02-15', title: '434234: this is an original title' }],
            '2023-02-16': [{ startDate: '2023-02-16', endDate: '2023-02-16', title: '3: this is an original title' }, { startDate: '2023-02-16', endDate: '2023-02-16', title: '42321q4: this is an original title' }],
          }}
          renderItem={(item, firstItemInDay) => {
            return (
              <RenderItem firstItemInDay={firstItemInDay} item={item} />
            )
          }}
          loadItemsForMonth={month => {
            loadItemsForMonth(month)

          }}
          onCalendarToggled={calendarOpened => {
            console.log(calendarOpened);
          }}
        />
      )}
      {/* {state.showList && <CalendarMonthList state={state} setState={setState} />} */}
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
  bottomView: {
    height: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'

  },
  firstItemInDay: {
    marginTop: 30
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  knobStyles: {
    width: 40,
    height: 5,
    backgroundColor: 'black',
  }
})


export default AgendaCalendar;