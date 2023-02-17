import { useState, useContext } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native"
import Text from "../../Atoms/Text";
import Button from "../../SharedComp/Buttons/Button";
import AddView from "../../SharedComp/Views/AddView";
import { COLORS } from "../../../shared/COLORS";
import AddInput from "../../SharedComp/Inputs/AddInput";
import HeaderWithDivider from "../../SharedComp/Views/HeaderWithDivider";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useRoute } from "@react-navigation/native";
import InputLabel from "../../SharedComp/Views/InputLabel";
import CheckboxPaper from "../../SharedComp/Buttons/CheckBox";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ModalTimePicker } from "./timePicker";
import { ModalDatePicker } from "./DatePicker";
import { useNavigation } from "@react-navigation/native";
import { DayContext } from "../../../useContext/daysContext";
import BoldText from "../../Atoms/Text/BoldText";




const EditRantevou = () => {
  const { setDay } = useContext(DayContext)


  const route = useRoute();
  const navigation = useNavigation();
  let routeData = route.params.data;
  const [day, month, year] = routeData["Ημ/νία"]?.split('/');
  let newDate = parseInt(day) + 1
  const date = new Date(year, month - 1, newDate);

  let startTime = routeData["'Ωρα"].split(' : ')[0];
  let endTime = routeData["'Ωρα"].split(' : ')[1];

  const [state, setState] = useState({
    data: [],
    loading: false,
    edit: false,
    show: false
  });


  const [raw, setRaw] = useState({
    eoppy: routeData["cccRDVEOPYY"],
    date: date,
    fromTime: startTime,
    toTime: endTime,
    soaction: routeData["soaction"],
    reason: 'customer'
  })


  const handleDate = (selectredDate) => {
    setRaw((prevState) => {
      return {
        ...prevState, date: selectredDate
      }
    })
    setDay(selectredDate)
  }
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


  //Modal Buttons:
  const subscriberReschedule = () => {
    setRaw((prevState) => {
      return {
        ...prevState, reason: 'subscriber'
      }
    })
    handlePost();
  }
  const customerReschedule = () => {
    setRaw((prevState) => {
      return {
        ...prevState, reason: 'customer'
      }
    })
    handlePost();
  }

  const handlePost = async () => {
    setState((prev) => {
      return {
        ...prev, loading: true
      }
    })
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: "RescheduleRDV", ...raw })
    navigation.navigate('DayView');

  }




  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.topViewLeftInfo}>
          <BoldText style={styles.topViewText}>{routeData["'Ωρα"]}</BoldText>
          <Text style={{ fontSize: 17 }}>{routeData["Πελάτης"] ? routeData["Πελάτης"] : "No Name"}</Text>
        </View>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <AntDesign name="closecircle" size={20} color={'#ea2a15'} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} >
        <AddView>
          <AddInput title="Πελάτης:" value={routeData["Πελάτης"]} enabled={false} />
          <AddInput title="Στέλεχος:" value={routeData["Στέλεχος"]} enabled={false} />
          <AddInput title="Υπηρεσία/Τύπος:" value={routeData["Ύπηρεσία/Τύπος"]} enabled={false} />
          <AddInput title="Σημείο:" value={routeData["Σημείο"]} enabled={false} />
          <CheckboxPaper title={"EΟΠΠΥ"} setState={setRaw} state={raw} disabled={true} />
          <AddInput title="Κατάσταση:" value={routeData["Κατάσταση"]} enabled={false} />
          <HeaderWithDivider text={"Κατάσταση"} />

          <InputLabel title="Ημερομηνία:">
            < ModalDatePicker style={styles.datePicker} day={raw.date} onChange={handleDate} />
          </InputLabel>
          {/* <DatePickers setState={setRaw} startTime={raw.fromTime} endTime={raw.toTime} /> */}
          <View style={styles.datePickerView}>
            <InputLabel title="* Έναρξη:">
              < ModalTimePicker propsTime={raw.fromTime} handleState={handleStartTime} />
            </InputLabel>
            <InputLabel style={styles.rightView} title="* Λήξη:">
              < ModalTimePicker propsTime={raw.toTime} handleState={handleEndTime} minTime={raw.fromTime} />
            </InputLabel>
          </View>
          {/* <DropDownList data={raw.status} setData={setRaw} /> */}
          <HeaderWithDivider text={"Eπαναπρογραμματισμός Ραντεβού"} />
          <View style={styles.row}>
            <TouchableOpacity onPress={customerReschedule} style={styles.reprogram} >
              {state.loading ? <ActivityIndicator color="white" /> : <Text style={styles.reprogramText} >Πελάτης</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={subscriberReschedule} style={styles.reprogram}>
              {state.loading ? <ActivityIndicator color="white" /> : <Text style={styles.reprogramText} >Συνδρομητής</Text>}
            </TouchableOpacity>
          </View>
        </AddView>
      </ScrollView >
    </View>

  )
}




const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 70
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
    backgroundColor: 'white'
  },

  topViewText: {
    fontSize: 14,
    color: 'black'
  },
  btn: {
    borderRadius: 2,
    width: '100%',
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 20,
  },
  datePicker: {
    width: '80%',
    height: 50,
    marginBottom: 10,
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
  dropItem: {
    height: 50,
    backgroundColor: COLORS.secondaryColorShade003,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  dropEnabled: {
    backgroundColor: COLORS.secondaryColorShade001
  },
  dropEnabledText: {
    color: 'black'
  },
  datePickerView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  datepickerRightView: {
    marginLeft: 10,
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
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '80%',
    backgroundColor: COLORS.secondaryColor,
    border: 'none',
  },
  closeIcon: {
    marginTop: 10,
    color: '#E1341E',
    fontSize: 30,
  },
  reprogram: {
    padding: 10,
    backgroundColor: COLORS.secondaryColor,
    marginVertical: 5,
    minHeight: 50,
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 5,
  },
  reprogramText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },



});


export default EditRantevou;