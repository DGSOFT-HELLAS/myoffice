import { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, Modal, Pressable } from "react-native"
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





const EditRantevou = () => {
  const { setDay } = useContext(DayContext)


  const route = useRoute();
  const navigation = useNavigation();
  let routeData = route.params.data;
  console.log('------------------- ROUTE DATA---------------------')
  console.log(routeData)
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
    <ScrollView style={styles.scrollView} >
      <AddView>
        <HeaderWithDivider text={`Στοιχεία Ραντεβού: ${routeData["Πελάτης"]}`} />
        <AddInput title="Πελάτης:" value={routeData["Πελάτης"]} enabled={false} />
        <AddInput title="Στέλεχος:" value={routeData["Στέλεχος"]} enabled={false} />
        <AddInput title="Υπηρεσία/Τύπος:" value={routeData["Ύπηρεσία/Τύπος"]} enabled={false} />
        <AddInput title="Σημείο:" value={routeData["Σημείο"]} enabled={false} />
        <CheckboxPaper title={"EΟΠΠΥ"} setState={setRaw} state={raw} disabled={true} />
        <HeaderWithDivider text={"Κατάσταση"} />
        <AddInput title="Κατάσταση:" value={routeData["Κατάσταση"]} enabled={false} />
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
        <ModalCheck subscriberReschedule={subscriberReschedule} customerReschedule={customerReschedule} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Ακύρωση</Text>
        </TouchableOpacity>
      </AddView>
    </ScrollView >
  )
}




// const DropDownList = ({ data, setData, key }) => {
//   const [show, setShow] = useState();


//   const DropItem = ({ title }) => {
//     const onPress = () => {
//       setData((prev) => {
//         return {
//           ...prev, ['status']: title
//         }
//       })
//       setShow(false)
//     }
//     return (
//       <TouchableOpacity style={styles.dropItem} onPress={onPress}>
//         <Text>{title}</Text>
//       </TouchableOpacity>
//     )
//   }

//   return (
//     <>
//       <TouchableOpacity style={[styles.katastasiView, show && styles.dropEnabled]} onPress={() => setShow((prev) => !prev)}>
//         <Text style={styles.dropEnabledText}>{data}</Text>
//         <AntDesign name="down" size={18} />
//       </TouchableOpacity>
//       {show && (
//         <View>
//           <DropItem title={'Nέο'} />
//           <DropItem title={'Aκυρώθηκε από Πελάτη'} />
//           <DropItem title={'Επαναπρογραμματίστηκε από Πελάτη'} />
//           <DropItem title={'Aκυρώθηκε από Συνδρομητή'} />
//           <DropItem title={'Επαναπρογραμματίστηκε από Συνδρομ.'} />
//         </View>
//       )}
//     </>
//   )
// }


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
            <Text style={styles.modalHeaderText}>Επαναπρογραμματισμός Ραντεβού από:
            </Text>
            <Button style={styles.modalBtn} text={"Πελάτη"} onPress={() => {
              setModalVisible(false);
              subscriberReschedule();
            }} />
            <Button style={styles.modalBtn} text={"Συνδρομητή"} onPress={() => {
              setModalVisible(false)
              customerReschedule();
            }} />
            <CloseIcon setModal={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Button style={styles.btn} text={"Eπαναπρογραμματισμός Ραντεβού"} onPress={() => setModalVisible(true)} />

    </>
  )
}

const CloseIcon = ({ setModal }) => {
  return (
    <Pressable
      onPress={() => setModal(false)}>
      <AntDesign style={styles.closeIcon} name="closecircle" />
    </Pressable>
  )
}


const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
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
  modalHeaderText: {
    width: '80%',
    color: 'black',
  },
  modalBtn: {
    width: '80%',
    backgroundColor: COLORS.secondaryColor,
    border: 'none',
    marginVertical: 6,
  },
  closeIcon: {
    marginTop: 10,
    color: '#E1341E',
    fontSize: 30,
  }



});


export default EditRantevou;