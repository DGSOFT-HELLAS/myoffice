import { StyleSheet } from "react-native";
import { useEffect, useContext, useState } from "react";
import { DayContext } from "../../../useContext/daysContext";
import { fetchAPI } from "../../../utils/fetchAPI";
import DayViewBody from "./DayViewBody";
import Spinner from "../../Atoms/ActivityIndicator";
import NoDataView from "../../Atoms/View/NoDataView";
import { UserContext } from "../../../useContext/useContect";
import AppointmentsView from "../../Atoms/View/AppointmentsView";
import ArrowButton from "../../Atoms/ArrowButton";
import { ModalDatePickerComp } from "../../DatePickers/ModalDatePicker";
import { incrementDecrementDate } from "../../../utils/incrementDecrementDate";
import ModalPersons from "../Modal";
import { Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";



const DayView = () => {
  const { trdr } = useContext(UserContext)
  const { day, setDay } = useContext(DayContext);
  const navigation = useNavigation();

  const [state, setState] = useState({
    data: [],
    loading: false,
    delete: false,
    refresh: false,
  })

  const [raw, setRaw] = useState({
    startDate: day ? day : new Date(),
    endDate: "",
    stelexos: 0,
  })

  console.log(raw)

  const onChange = (selectedDate) => {
    setRaw(prev => {
      return {
        ...prev, startDate: selectedDate
      }
    })

  };

  const nextButton = () => {
    let startDate = incrementDecrementDate(new Date(raw.startDate), 'increment');

    setRaw(prev => {
      return {
        ...prev, startDate: startDate
      }
    })
  }

  const prevButton = () => {
    let startDate = incrementDecrementDate(new Date(raw.startDate), 'decrement');
    setRaw(prev => {
      return {
        ...prev, startDate: startDate
      }
    })
  }


  const handleFetch = async () => {
    setState((prev) => {
      return {
        ...prev, loading: true
      }
    })

    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      startDate: raw.startDate,
      endDate: "",
      trdr: trdr,
      stelexos: raw.stelexos,
      query: "wpFetchRDVForCalendar"

    })

    setState((prev) => {
      return {
        ...prev, loading: false, data: res
      }
    })


  }

  useEffect(() => {
    handleFetch()
    const unsubscribe = navigation.addListener('focus', () => {
      handleFetch()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [raw.startDate, state.delete, raw.stelexos, day, navigation])

  return (
    <Provider>
      <ModalPersons title={"Στέλεχος"} query="GetPersons" setState={setRaw} updateValue={"stelexos"} hideLabel={true} />
      <AppointmentsView style={styles.dayViewHeader}>
        <ArrowButton onPress={prevButton} iconType="prevIcon" />
        < ModalDatePickerComp day={raw.startDate} onChange={onChange} />
        <ArrowButton onPress={nextButton} iconType="nextIcon" />
      </AppointmentsView >
      {state.loading ? <Spinner /> : state.data?.length == 0 ? <NoDataView /> : <DayViewBody data={state.data} setState={setState} />}


    </Provider>
  )
}



const styles = StyleSheet.create({
  dayViewHeader: {
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderBottomColor: '#d1cfce',
    backgroundColor: 'white'
  },

  calendarIcon: {
    fontSize: 20,
  }
});

export default DayView;