import { useContext, useEffect, useState } from "react"
import { splitDate } from "../../../utils/dateFunctions/splitDate"
import ChooseDates from "../../SharedComp/ChooseDates/ChoseDates"
import IncomingCallsBody from "./IncomingCallsBody"
import { fetchAPI } from "../../../utils/fetchAPI"
import { UserContext } from "../../../useContext/useContect"
import NoDataView from "../../Atoms/View/NoDataView"
import Spinner from "../../Atoms/ActivityIndicator"

const IncomingCalls = () => {
  const { trdr } = useContext(UserContext);
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    data: [],
    loading: true
  });


  const onChangeStartDay = (selectedDate) => {
    setState((prevState) => {
      return {
        ...prevState, startDate: selectedDate
      }
    })
  };

  const onChangeEndDay = (selectedDate) => {
    setState((prevState) => {
      return {
        ...prevState, endDate: selectedDate
      }
    })
  };




  const handleFetch = async () => {
    setState((prevState) => {
      return {
        ...prevState, loading: true
      }
    })
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { startDate: state.startDate, endDate: state.endDate, trdr: trdr, query: "getCalls" })
    try {
      if (response) {
        console.log(response)
        setState((prevState) => {
          return {
            ...prevState, data: response
          }
        })
        setState((prevState) => {
          return {
            ...prevState, loading: false
          }
        })
        // setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch();
  }, [state.startDate, state.endDate])



  return (
    <>
      <ChooseDates day={state.startDate} endDay={state.endDate} onChangeStartDay={onChangeStartDay} onChangeEndDay={onChangeEndDay} />
      {state.loading ? <Spinner /> : state.data?.length == 0 ? <NoDataView /> : <IncomingCallsBody data={state.data} />}

    </>

  )
}


export default IncomingCalls;