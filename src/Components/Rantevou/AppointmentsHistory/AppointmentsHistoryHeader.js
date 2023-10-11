import { useContext, useEffect, useState } from "react"
import RantevouListBody from "./RantevouHistoryBody"
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
  console.log(state.delete)

  const onChangeStartDay = (selectedDate) => {
    setState(prev => {
      return {
        ...prev, startDate: selectedDate
      }
    })
  };

  const onChangeEndDay = (selectedDate) => {
    setState(prev => {
      return {
        ...prev, endDate: selectedDate
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
    setState(prev => {
      return {
        ...prev, data: res, loading: false
      }
    })
  }


  useEffect(() => {
    handleFetch()
    console.log('appointment history screen')
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