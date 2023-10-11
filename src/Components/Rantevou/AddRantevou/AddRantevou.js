import { useState, useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-native-paper';
import { COLORS } from '../../../shared/COLORS';
import ModalView from './ModalView';
import CommentInput from './CommentInput';
import DatePickers from './DatePickers';
import Button from '../../SharedComp/Buttons/Button';
import { fetchAPI } from '../../../utils/fetchAPI';
import AddView from '../../SharedComp/Views/AddView';
import CheckboxPaper from '../../SharedComp/Buttons/CheckBox';
import HeaderWithDivider from '../../SharedComp/Views/HeaderWithDivider';
import { UserContext } from '../../../useContext/useContect';
import { DayContext } from '../../../useContext/daysContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ListBodyDataSet } from '../../SharedComp/List/List';

const AddRantevou = () => {
  const route = useRoute();
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

  // console.log(route.params)
  console.log('state for addrantebou: ' + state)

  useEffect(() => {
    //On day view if we press on a specific time, we get the input of that time formatted as a date, and we convert it to plain time ex. 12: 40
    if (route.params) {
      // let fromTime = new Date(route.params.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      // let toTime = new Date(route.params.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setState(prev => {
        return {
          ...prev, date: new Date(route.params.date), fromTime: new Date(route.params.start), toTime: new Date(route.params.end)
        }
      })
    }
  }, [])

        


  const handleEmptyState = () => {
    if (state.service == '' || state.person == '' || state.customer == '' || state.place == '' || state.fromTime == '' || state.toTime == '') {
      return Alert.alert("Συμπληρώστε τα απαραίτητα πεδία")
    }

  }

  const onPress = async () => {
    handleEmptyState();
    let date = state.date;
    setDay(date)
    if (state.service !== '' && state.person !== '' && state.customer !== '' && state.place !== '' && state.fromTime !== '' && state.toTime !== '') {
      const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: 'insertEvent', trdr: trdr, ...state })
      try {
        if (response) {
          console.log(response)
          if (response.error) {
            Alert.alert(`${response.errorMessage}`)
          } else {
            // navigation.navigate('DayViewCalendarMain', { date: date.toString() })
            navigation.goBack();
          }
        }
      } catch (error) {
        // console.log(error)
      }

      //Fix the date to the nec

    }
  }
  const cancelAdd = () => {
    navigation.goBack()
  }
  return (
    <Provider>
      <ScrollView style={styles.scrollView} >
        <AddView>
          <HeaderWithDivider text={"Στοιχεία Ραντεβού"} />
          <ModalView title={"* Πελάτες:"} query="GetCustomers" setState={setState} updateValue={"customer"} addClient={true} />
          <ModalView title={"* Τύπος/Υπηρεσίες:"} query="GetServices" setState={setState} updateValue={"service"} />
          <ModalView title={"* Στέλεχος:"} query="GetPersons" setState={setState} updateValue={"person"} />
          <ModalView title={"* Σημείο:"} query="GetPlaces" setState={setState} updateValue={"place"} />
          <HeaderWithDivider text={"Κατάσταση"} />
          <ListBodyDataSet title={'* Ημερομηνία:'} value={state.date.toLocaleDateString()} enabled={false} />
          <DatePickers setState={setState} startTime={state.fromTime} endTime={state.toTime} />
          <CheckboxPaper title={"EΟΠΠΥ"} setState={setState} state={state} />
          <CheckboxPaper title={"ΠΡΟΣΩΠΙΚΟ"} setState={setState} state={state} />
          <CommentInput setState={setState} />
          <View style={styles.btnView}>
            <Button style={styles.btn} text={"Αποθήκευση"} onPress={onPress} />
            <Button style={styles.cancelBtn} text={"Aκύρωση"} onPress={cancelAdd} />
          </View>
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
    marginRight: 5,
    width: '45%',
  },
  cancelBtn: {
    width: '45%',
    backgroundColor: COLORS.deleteBtn,
    marginLeft: 5,
  },
  btnView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }

})


export default AddRantevou