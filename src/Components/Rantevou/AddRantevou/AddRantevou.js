import { useState, useContext } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native'
import React from 'react'
import { Provider } from 'react-native-paper';
import { COLORS } from '../../../shared/COLORS';
//Import Icons:
import ModalView from './ModalView';
import CommentInput from './CommentInput';
import DatePickers from './DatePickers';
import { ModalDatePickerComp } from '../../DatePickers/ModalDatePicker';
import InputLabel from '../../SharedComp/Views/InputLabel';
import Button from '../../SharedComp/Buttons/Button';
import { fetchAPI } from '../../../utils/fetchAPI';
//Imports from other Files:
import AddView from '../../SharedComp/Views/AddView';
import CheckboxPaper from '../../SharedComp/Buttons/CheckBox';
import HeaderWithDivider from '../../SharedComp/Views/HeaderWithDivider';
import { UserContext } from '../../../useContext/useContect';
import { DayContext } from '../../../useContext/daysContext';

import { useNavigation } from '@react-navigation/native';

const AddRantevou = () => {
  const { trdr } = useContext(UserContext);
  const { setDay } = useContext(DayContext);
  const navigation = useNavigation()
  const [state, setState] = useState({
    service: '',
    person: '',
    date: new Date(),
    customer: '',
    place: '',
    eoppy: 0,
    personal: 0,
    comments: '',
    fromTime: new Date(),
    toTime: new Date(),
    status: 1
  })
  console.log("---------------------------------- add rantevou state ----------------------------------")
  console.log(state)
  let date = state.date;
  console.log(date)
  console.log("---------------------------------- -----------------------e ----------------------------------")

  const handleDate = (selectredDate) => {
    setState((prevState) => {
      return {
        ...prevState, date: selectredDate
      }
    })
  }





  const handleEmptyState = () => {
    if (state.service == '' || state.person == '' || state.customer == '' || state.place == '' || state.fromTime == '' || state.toTime == '') {
      return Alert.alert("Συμπληρώστε τα απαραίτητα πεδία")
    }

  }


  const onPress = async () => {
    handleEmptyState();
    let date = state.date;
    console.log(date)
    setDay(date)
    if (state.service !== '' && state.person !== '' && state.customer !== '' && state.place !== '' && state.fromTime !== '' && state.toTime !== '') {
      const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: 'insertEvent', trdr: trdr, ...state })
      try {
        if (response) {
          console.log(response)
          if (response.error) {
            Alert.alert("Τo Ραντεβού Δεν Είναι Πλέον Διαθέσιμο!")
          } else {
            navigation.navigate('DayView')
          }
        }
      } catch (error) {
        // console.log(error)
      }

      //Fix the date to the nec

    }
  }

  return (
    <Provider>
      <ScrollView style={styles.scrollView} >
        {/* <HeaderView Icon={FontAws} iconName={"calendar-plus-o"} title="Προσθήκη Ραντεβού" /> */}
        <AddView>
          <HeaderWithDivider text={"Στοιχεία Ραντεβού"} />
          <ModalView title={"* Πελάτες:"} query="GetCustomers" setState={setState} updateValue={"customer"} />
          <ModalView title={"* Τύπος/Υπηρεσίες:"} query="GetServices" setState={setState} updateValue={"service"} />
          <ModalView title={"* Στέλεχος:"} query="GetPersons" setState={setState} updateValue={"person"} />
          <ModalView title={"* Σημείο:"} query="GetPlaces" setState={setState} updateValue={"place"} />
          <HeaderWithDivider text={"Κατάσταση"} />
          <InputLabel title="* Ημερομηνία:">
            < ModalDatePickerComp style={styles.datePicker} day={state.date} onChange={handleDate} />
          </InputLabel>
          <DatePickers setState={setState} />
          <CheckboxPaper title={"EΟΠΠΥ"} setState={setState} state={state} />
          <CheckboxPaper title={"ΠΡΟΣΩΠΙΚΟ"} setState={setState} state={state} />
          <CommentInput setState={setState} />
          <Button style={styles.btn} text={"Αποθήκευση"} onPress={onPress} />
        </AddView>
      </ScrollView >
    </Provider>

  )
}






const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
  },
  addView: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 30,
  },
  headerView: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryColor,
    padding: 10,
    height: 50,
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 5,
    color: 'white'
  },
  datePicker: {
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  btn: {
    borderRadius: 2,
    width: 150,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 20,
  }



  // datePicker: {
  //   width: '100%',
  //   backgroundColor: 'white',
  //   height: 50,
  //   marginBottom: 10,
  //   marginTop: 5,
  // },
  // leftSide: {
  //   width: '85%',
  // },
  // righSide: {
  //   width: '15%',
  // },



})


export default AddRantevou