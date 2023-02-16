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
import ModalPersons from "../Modal";
import { Provider } from "react-native-paper";
import { useIsFocused } from '@react-navigation/native';
import EventScreen from "../EventScreen/EventScreen";


const DayViewCalendarMain = () => {
  const { day, setDay, setSingleEvent } = useContext(DayContext)
  console.log(day)
  const navigation = useNavigation()
  const { trdr } = useContext(UserContext)
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const isFocused = useIsFocused();

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
    const updatedData = res.map(item => ({ ...item, id: item.soaction, start: new Date(item.start), end: new Date(item.end), title: item.title, style: item.color }));
    setEvents(updatedData)

    setState(prev => {
      return {
        ...prev, loading: false,
      }
    })
  }

  useEffect(() => {
    setIsVisible(false)
    handleFetch()
    const unsubscribe = navigation.addListener('focus', () => {
      handleFetch()
    });

    return unsubscribe;

  }, [day, state.delete, state.stelexos, isFocused, navigation])




  const onDragCreateEnd = (event) => {
    let date = event.start.split('T')[0]
    let start = event.start.split('T')[0] + 'T' + new Date(event.start).toLocaleTimeString()
    let end = event.end.split('T')[0] + 'T' + new Date(event.end).toLocaleTimeString()
    navigation.navigate('AddRantevou', { start: start, end: end, date: date })

  };

  const onPressEvent = (evt) => {
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
    setSingleEvent(obj)
    ///delete later
    setIsVisible(true)

  }


  const goTo = () => {
    navigation.navigate('EventScreen')
  }
  return (
    <Provider>
      {!isVisible ? (
        <View style={styles.container}>
          <ModalPersons title={"Στέλεχος"} query="GetPersons" setState={setState} updateValue={"stelexos"} hideLabel={true} />
          <DayViewCalendarHeader date={day} setState={setState} state={state} />
          {/* <ColorLoader loading={state.loading} /> */}
          <TimelineCalendar
            viewMode="day"
            isShowHeader={false}
            // initialDate={route.params ? route.params.date : new Date().toISOString().split('T')[0]}
            initialDate={day}
            events={events}
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
              onPressEvent(evt)
            }}
            allowDragToCreate
            dragCreateInterval={30}
            onDragCreateEnd={(e) => onDragCreateEnd(e)}

          />

          {/* <ModalFullEvent event={event} isVisible={isVisible} setIsVisible={setIsVisible} state={state} setState={setState} /> */}
        </View>
      ) : <EventScreen setIsVisible={setIsVisible} setState={setState} />}
    </Provider>
  )


}

const eventItem = (event) => {
  return (
    <View style={[styles.customItem]}>
      <BoldText style={styles.eventText}>{`${event["'Ωρα"]}`}</BoldText>
      <Text style={styles.eventText2}>{` - ${event.title}`}</Text>
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