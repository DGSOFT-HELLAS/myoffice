import { useState, useContext, useEffect } from "react";
import ChooseDates from "../../SharedComp/ChooseDates/ChoseDates";
import { UserContext } from "../../../useContext/useContect";
import { fetchAPI } from "../../../utils/fetchAPI";
import { splitDate } from "../../../utils/dateFunctions/splitDate";
import Spinner from "../../Atoms/ActivityIndicator";
import NoDataView from "../../Atoms/View/NoDataView";
import IncomingTasksBody from "./IncomingTasksBody";

const IncomingTasks = () => {
  const { trdr } = useContext(UserContext);
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    data: [],
    loading: true
  });


  const onChangeStartDay = (selectedDate) => {
    console.log(selectedDate)
    let split = splitDate(selectedDate)
    console.log("split " + split)
    // setDay(split)
    setState((prevState) => {
      return {
        ...prevState, startDate: split
      }
    })
  };

  const onChangeEndDay = (selectedDate) => {
    let split = splitDate(selectedDate)
    // setEndDay(split)
    setState((prevState) => {
      return {
        ...prevState, endDate: split
      }
    })
  };




  const handleFetch = async () => {
    setState((prevState) => {
      return {
        ...prevState, loading: true
      }
    })
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { startDate: state.startDate, endDate: state.endDate, trdr: trdr, query: "wpTask" })
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
      {state.loading ? <Spinner /> : state.data?.length == 0 ? <NoDataView /> : <IncomingTasksBody data={state.data} />}
    </>

  )
}


export default IncomingTasks;