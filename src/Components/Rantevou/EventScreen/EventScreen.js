import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { COLORS } from "../../../shared/COLORS";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ListBodyDataSet, ListBodyView } from "../../SharedComp/List/List";
// import DeleteButton from "../../SharedComp/Buttons/DeleteButton";
// import Button from "../../SharedComp/Buttons/Button";
import EditButton from "../../SharedComp/Buttons/EditButton";
import CheckboxPaper from "../../SharedComp/Buttons/CheckBox";
import { useNavigation } from "@react-navigation/native";
import BoldText from "../../Atoms/Text/BoldText";
import { fetchAPI } from "../../../utils/fetchAPI";
import { DayContext } from "../../../useContext/daysContext";
import { DatePickerComp } from "./DatePicker";
import { TimePicker } from "./timePicker";
import InputLabel from "../AddRantevou/InputLabel";


const EventScreen = ({ setIsVisible, setState }) => {
  const navigation = useNavigation()
  const { day, singleEvent, setDay } = useContext(DayContext)

  // const [day1, month, year] = routeData["Ημ/νία"]?.split('/');
  // let newDate = parseInt(day1) + 1
  // const date = new Date(year, month - 1, newDate);

  let startTime = singleEvent["'Ωρα"].split(' : ')[0];
  let endTime = singleEvent["'Ωρα"].split(' : ')[1];

  const onEditBtn = (data) => {
    navigation.navigate('Διόρθωση ραντεβού', { data: data })
  }



  const [raw, setRaw] = useState({
    eoppy: singleEvent["cccRDVEOPYY"],
    // date: date,
    date: day,
    fromTime: startTime,
    toTime: endTime,
    soaction: singleEvent["soaction"],
    reason: 'customer'
  })

  console.log(raw)

  useEffect(() => {
    setRaw(prev => {
      return {
        ...prev, soaction: singleEvent["soaction"]
      }
    })
  }, [singleEvent["soaction"]])


  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.topViewLeftInfo}>
          <BoldText style={styles.topViewText}>{singleEvent["'Ωρα"]}</BoldText>
          <Text style={{ fontSize: 17 }}>{singleEvent["Πελάτης"] ? singleEvent["Πελάτης"] : "No Name"}</Text>
        </View>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            setIsVisible(false)
          }}
        >
          <AntDesign name="closecircle" size={20} color={'#ea2a15'} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.bodyView}>
        <ListBody data={singleEvent} onEditBtn={onEditBtn} raw={raw} setRaw={setRaw} setDay={setDay} setIsVisible={setIsVisible} setState={setState} />
      </ScrollView>
    </View>
  );
}


const ListBody = ({ data, onEditBtn, raw, setIsVisible, setDay, setState, day, setRaw }) => {
  const navigation = useNavigation()
  const [hide, setHide] = useState()
  const handleDate = (selectredDate) => {
    console.log('selected date: ' + selectredDate)
    setRaw((prevState) => {
      return {
        ...prevState, date: selectredDate
      }
    })
  }

  const subscriberReschedule = () => {
    handlePost('subscriber');
    setIsVisible(false)
  }
  const customerReschedule = () => {
    handlePost('customer');
    setIsVisible(false)
  }
  useEffect(() => {
  }, [])


  const handlePost = async (reason) => {
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: "CancelRDV", reason: reason, ...raw })
    if (setState) {
      setState(prev => {
        return {
          ...prev, delete: !prev.delete
        }
      })
    }
  }



  // const handlePost2 = async () => {
  //   setDay('2023-03-04')
  //   const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: "RescheduleRDV", ...raw2 })
  //   setIsVisible(false);
  //   navigation.navigate('DayViewCalendarMain');

  // }

  return (
    <ListBodyView>
      <ListBodyDataSet title={'Στέλεχος'} value={data["Στέλεχος"]} enabled={false} />
      <ListBodyDataSet title={'Ύπηρεσία/Τύπος'} value={data["Ύπηρεσία/Τύπος"]} enabled={false} />
      <ListBodyDataSet title={'Σημείο'} value={data["Σημείο"]} enabled={false} />
      <ListBodyDataSet title={'Κατάσταση'} value={data["Κατάσταση"]} enabled={false} />
      <ListBodyDataSet title={"'Ωρα"} value={data["'Ωρα"]} enabled={false} />
      <ListBodyDataSet title={"Ημ/νία"} value={data["Ημ/νία"]} enabled={false} />
      <CheckboxPaper title={"EΟΠΠΥ"} state={data.cccRDVEOPYY} disabled={true} />
      <CheckboxPaper title={"ΠΡΟΣΩΠΙΚΟ"} state={data.personal} disabled={true} />
      <ListBodyDataSet title={'Σχόλια'} value={data["Σχόλια"]} enabled={false} />
      {hide ? (
        <>
          <BoldText style={styles.editTileText}>Κατάσταση:</BoldText>
          <Text style={styles.smallText}>Αλλάξτε την ημερομηνία και την ώρα και καταχωρήστε εκ νέου το ραντεβού:</Text>
          <InputLabel title="* Ημερομηνία:">
            <DatePickerComp day={new Date(raw.date)} onChange={handleDate} style={{ width: '70%' }} />
          </InputLabel>

          <ShowEditComponents raw={raw} setRaw={setRaw} />
        </>
      ) : (null)}
      <View style={styles.buttonView}>
        <EditButton onPress={() => setHide((prev) => !prev)} />

      </View>


    </ListBodyView>
  )
}

const ShowEditComponents = ({ raw, setRaw }) => {
  const handleStartTime = (time) => {
    setRaw((prevState) => {
      return {
        ...prevState, fromTime: time
      }
    })
  }
  const handleEndTime = (time) => {
    setRaw((prevState) => {
      return {
        ...prevState, toTime: time
      }
    })
  }


  return (
    <>
      <InputLabel title="* Έναρξη:">
        <TimePicker style={{ width: '70%' }} propsTime={raw.fromTime} handleState={handleStartTime} />
        {/* propsTime={raw.fromTime} handleState={handleStartTime} */}
      </InputLabel>
      <InputLabel title="* Λήξη:">
        <TimePicker style={{ width: '70%' }} propsTime={raw.toTime} handleState={handleEndTime} />
        {/* propsTime={raw.fromTime} handleState={handleStartTime} */}
      </InputLabel>
    </>
  )
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    top: 0,
    zIndex: 11
  },
  topView: {
    minHeight: 60,
    padding: 15,
    width: "100%",
    flexDirection: 'row',
    // backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d7d6d6',
  },
  topViewLeftInfo: {
    // flexDirection: 'row'

  },
  topViewText: {
    fontSize: 14,
    color: 'black'
  },
  bodyView: {
    flex: 1,
    padding: 10,
    width: "100%",
    backgroundColor: "white",
  },
  closeIcon: {
    borderWidth: 2,
    backgroundColor: '#ea2a15'

  },
  buttonView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  katastasiView: {
    height: 50,
    backgroundColor: COLORS.input,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    padding: 10,

  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 3,
    minHeight: 200,
    // padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    border: 'none',
    padding: 10,
    minWidth: 80,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 10,
  },

  closeView: {
    padding: 10,
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  editTileText: {
    marginTop: 20,
    fontSize: 20
  },
  smallText: {
    fontSize: 13,
    marginBottom: 20,
  }


});

export default EventScreen;