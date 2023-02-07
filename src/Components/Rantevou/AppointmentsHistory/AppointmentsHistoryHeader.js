import { useContext, useEffect, useState } from "react"
import RantevouListBody from "./RantevouHistoryBody"
import { DayContext } from "../../../useContext/daysContext"
import { splitDate } from "../../../utils/dateFunctions/splitDate"
import ChooseDates from "../../SharedComp/ChooseDates/ChoseDates"
import Spinner from '../../Atoms/ActivityIndicator'
import { UserContext } from "../../../useContext/useContect"
import { fetchAPI } from "../../../utils/fetchAPI"
import NoDataView from "../../Atoms/View/NoDataView"
import ModalPersons from "../Modal"
import { Provider } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"


const AppointmentsHistory = () => {
  const { trdr } = useContext(UserContext)
  const navigation = useNavigation();
  const [state, setState] = useState({
    data: [],
    loading: false,
    startDate: new Date(),
    endDate: new Date(),
    stelexos: 0,
    delete: false,
  })

  console.log('----------------------------- STATE --------------------------------')
  console.log(state.stelexos, state.startDate, state.endDate)
  console.log('--------------------------------------------------------------------')

  const onChangeStartDay = (selectedDate) => {
    let split = splitDate(selectedDate)
    setState(prev => {
      return {
        ...prev, startDate: split
      }
    })
  };

  const onChangeEndDay = (selectedDate) => {
    let split = splitDate(selectedDate)
    setState(prev => {
      return {
        ...prev, endDate: split
      }
    })
  };

  const handleFetch = async () => {

    setState(prev => {
      return {
        ...prev, loading: true
      }
    })
    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      startDate: state.startDate,
      endDate: state.endDate,
      trdr: trdr,
      stelexos: state.stelexos,
      query: 'wpFetchRDVForCalendar'
    })
    console.log(res)
    setState(prev => {
      return {
        ...prev, data: res, loading: false
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
  }, [state.startDate, state.endDate, state.stelexos, state.delete, navigation])



  return (
    <Provider>
      <ModalPersons title={"Στέλεχος"} query="GetPersons" setState={setState} updateValue={"stelexos"} hideLabel={true} />
      <ChooseDates day={state.startDate} endDay={state.endDate} onChangeStartDay={onChangeStartDay} onChangeEndDay={onChangeEndDay} />
      {state.loading ? <Spinner /> : state.data?.length == 0 ? <NoDataView /> : < RantevouListBody data={state.data} setState={setState} />}
    </Provider>

  )
}


export default AppointmentsHistory;