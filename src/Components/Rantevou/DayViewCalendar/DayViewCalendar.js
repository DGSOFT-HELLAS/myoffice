import React, { useEffect, useCallbac, useState, useContext } from "react";
import { StyleSheet, View, Text, Alert, SafeAreaView, ActivityIndicator, Modal, Pressable, TouchableOpacity } from "react-native";
import WeekView from 'react-native-week-view';
import { fetchAPI } from "../../../utils/fetchAPI";
import { UserContext } from "../../../useContext/useContect";
import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../../../shared/COLORS";
import DeleteButton from "../../SharedComp/Buttons/DeleteButton";
import EditButton from "../../SharedComp/Buttons/EditButton";
import Button from "../../SharedComp/Buttons/Button";
import Feather from 'react-native-vector-icons/Feather'

const myEvents = [
  {
    id: 1,
    description: 'Event 1',
    startDate: '2023-02-08 10:10', // Day may be passed as string
    endDate: '2023-02-08 10:20', // Or as number, 1 = monday
    color: 'blue',
  },
  {
    id: 2,
    description: 'Event 1',
    startDate: '2023-02-08 10:10', // Day may be passed as string
    endDate: '2023-02-08 10:20', // Or as number, 1 = monday
    color: 'blue',
  },
  {
    id: 3,
    description: 'Event 1',
    startDate: '2023-02-08 10:10', // Day may be passed as string
    endDate: '2023-02-08 10:20', // Or as number, 1 = monday
    color: 'blue',
  },
  {
    id: 1142324243,
    description: 'Event 1',
    startDate: '2023-02-08 10:10', // Day may be passed as string
    endDate: '2023-02-08 10:20', // Or as number, 1 = monday
    color: 'blue',
  },
  {
    id: 4,
    description: 'Event 1',
    startDate: '2023-02-08 10:30', // Day may be passed as string
    endDate: '2023-02-08 10:40', // Or as number, 1 = monday
    color: 'blue',
  },
  {
    id: 6,
    description: 'Event 3',
    startDate: '2023-02-08 10:30', // Day may be passed as string
    endDate: '2023-02-08 10:40', // Or as number, 1 = monday
    color: 'blue',
  },
  {
    id: 5,
    description: 'Event 1',
    startDate: '2023-02-08 10:00', // Day may be passed as string
    endDate: '2023-02-08 11:00', // Or as number, 1 = monday
    color: 'blue',
  },
  // {
  //   id: 2,
  //   description: 'Event 1',
  //   startDate: '2023-02-08 10:20', // Day may be passed as string
  //   endDate: '2023-02-08 10:30', // Or as number, 1 = monday
  //   color: 'blue',
  // },
  // {
  //   id: 3,
  //   description: 'Event 1',
  //   startDate: '2023-02-08 10:30', // Day may be passed as string
  //   endDate: '2023-02-08 10:40', // Or as number, 1 = monday
  //   color: 'blue',
  // },

];



const DayViewCalendar = () => {
  const { trdr } = useContext(UserContext);
  const [state, setState] = useState({
    data: [],
    loading: false,
    startDate: '',
    endDate: '',
    stelexos: 0
  })

  const [event, setEvent] = useState([])
  console.log('------------ EVENT ---------------------')
  console.log(event)


  const onSwipePrev = date => {

    setState((prev) => {
      return {
        ...prev, startDate: date, endDate: ''
      }
    })

  };


  const onSwipeNext = date => {
    setState((prev) => {
      return {
        ...prev, startDate: date, endDate: ''
      }
    })
    // console.log("date add 2: " + date.toLocaleDateString())
  };


  const handlePressGrid = (event, startHour, date) => {

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // zero-based
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    console.log('Start Hour: ' + startHour + ' ' + minutes + ' ' + seconds)
    let fullDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    console.log(fullDate)
    // Alert.alert(`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);
  };


  const onDayPress = (date, formattedDate) => {
    console.log('Day: ', date, formattedDate);
  };


  const onTimeScrolled = d => console.log('Time scrolled', d.toTimeString());


  const handlePressEvent = event => {
    // if (editingEvent != null) {
    //   setEditEvent(null);
    //   return;
    // }

    const { id, color, startDate, endDate } = event;
    Alert.alert(
      `Event press ${color} - ${id}`,
      `start: ${startDate}\nend: ${endDate}`,
    );
  };



  const handleFetch = async () => {
    // setState(prev => {
    //   return {
    //     ...prev, loading: true
    //   }
    // })
    // setEvent([]);
    // let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
    //   startDate: state.startDate,
    //   endDate: state.endDate,
    //   trdr: trdr,
    //   stelexos: state.stelexos,
    //   query: "wpFetchRDVForCalendar",
    //   action: 'format'

    // })

    // res.map(event => {
    //   setEvent((prev) => {
    //     return [...prev, { startDate: new Date(event.start), endDate: new Date(event.end), id: event.soaction, description: event.title, time: event["'Ωρα"], eventKind: 'standard' }]
    //   })
    // })
    // setState(prev => {
    //   return {
    //     ...prev, loading: false
    //   }
    // })


  }



  useEffect(() => {
    handleFetch();
  }, [state.startDate, state.endDate, state.stelexos])


  return (
    <SafeAreaView style={styles.container}>
      {/* <WeekView
        timeStep={30}
        startHour={8}
        // events={event ? event : null}
        events={myEvents}
        selectedDate={new Date()}
        numberOfDays={1}
        onEventPress={handlePressEvent}
        onDayPress={onDayPress}
        onMonthPress={(month) => {
          console.log(month)
          console.log('month press')
        }}
        onSwipePrev={onSwipePrev}
        onSwipeNext={onSwipeNext}
        onGridClick={handlePressGrid}
        headerStyle={styles.header}
        headerTextStyle={styles.headerText}
        hourTextStyle={styles.hourText}
        // gridRowStyle={styles.gridRow}
        gridColumnStyle={styles.gridColumn}
        // eventContainerStyle={styles.eventContainer}
        onTimeScrolled={onTimeScrolled}
        timesColumnWidth={0.25}
        beginAgendaAt={8 * 60}
        showTitle={true}
        allowScrollByDay={true}
        formatDateHeader={'MMM D'}
        RefreshComponent={RefreshComponent}
        isRefreshing={state.loading}
      /> */}
      <WeekView
        events={myEvents}
        fixedHorizontally={true}
        // Recommended props:
        showTitle={false} // if true, shows this month and year
        numberOfDays={1}
        formatDateHeader="ddd" // display short name days, e.g. Mon, Tue, etc
        selectedDate={new Date()}
        timeStep={15}
      // ... other props
      />

    </SafeAreaView>
  )
}

// const CustomComp = ({ event, position }) => {
//   return (
//     <>
//       <View style={styles.customContainer}>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Icon style={styles.eventIcon} name="clockcircleo" />
//           <Text style={styles.eventHeaderText} >{event.time}</Text>
//         </View>
//         <View>
//           <TouchableOpacity style={styles.editBtn}>
//             <Feather name="edit" />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.eventBodyView}>
//         <Text>
//           {event.description}
//         </Text>
//       </View>

//     </>
//   )
// }
const CustomComp = ({ event, position }) => {
  return (
    <>
      {/* <View style={styles.customContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon style={styles.eventIcon} name="clockcircleo" />
          <Text style={styles.eventHeaderText} >{event.time}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.editBtn}>
            <Feather name="edit" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.eventBodyView}>
        <Text>
          {event.description}
        </Text>
      </View> */}
      <View>
        <Text>{event.title}</Text>
      </View>
    </>
  )
}

const RefreshComponent = ({ style }) => {
  return (
    <ActivityIndicator style={style} color="red" size="large" />
  )
}

const ModalCheck = ({ subscriberReschedule, customerReschedule }) => {
  const [modalVisible, setModalVisible] = useState(false);



  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer} >
          <View style={styles.modalView} >
            <View style={styles.topView}>
              <Text>Επαναπρογραμματισμός Ραντεβού από:</Text>
            </View>
            <Button style={styles.modalBtn} text={"Πελάτη"} onPress={() => {
              setModalVisible(false);
              // customerReschedule();


            }} />
            <Button style={styles.modalBtn} text={"Συνδρομητή"} onPress={() => {
              setModalVisible(false)
              // subscriberReschedule();
            }} />
            <View style={styles.closeView}>
              <CloseIcon setModal={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <DeleteButton onPress={() => setModalVisible(true)} style={{ marginLeft: 10 }} />

    </>
  )
}

const CloseIcon = ({ setModal }) => {
  return (
    <Pressable
      onPress={() => setModal(false)}>
      <Icon style={styles.closeIcon} name="closecircle" size={30} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  eventContainer: {
    backgroundColor: COLORS.secondaryColorShade003,
    width: '100%',
    elevation: 1,
  },
  customContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: COLORS.secondaryColor,
    borderColor: COLORS.secondaryColorShade003,
  },
  headerText: {
    color: 'white',
  },
  hourText: {
    color: 'black',
    fontSize: 15,
  },
  gridRow: {
    borderTopWidth: 0.8,
    borderColor: '#c4c4c4',
    backgroundColor: '#f5f5f5',
  },
  gridColumn: {
    borderLeftWidth: 0.7,
    borderColor: '#c4c4c4',
  },
  //Style the custom event:
  eventBodyView: {
    padding: 10,
  },
  eventIcon: {
    marginRight: 5,
  },
  eventHeaderText: {
    color: 'black',
  },
  buttonView: {
    flexDirection: 'row'
  }
});

export default DayViewCalendar;