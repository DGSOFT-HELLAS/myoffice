import { useContext, useEffect, useState } from "react"

import IncomingCallsBody from "./IncomingCallsBody"
import { fetchAPI } from "../../../utils/fetchAPI"
import { UserContext } from "../../../useContext/useContect"
import NoDataView from "../../Atoms/View/NoDataView"
import Spinner from "../../Atoms/ActivityIndicator"
import { useRoute } from "@react-navigation/native"


const IncomingCalls = () => {
  const { trdr } = useContext(UserContext);
  const router = useRoute()
  let parsedRouter = JSON.parse(router.params.state)
  const [state, setState] = useState({
    data: [],
    loading: true,
    refresh: false
  });




  const handleFetch = async () => {
    setState((prevState) => {
      return {
        ...prevState, loading: true
      }
    })
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { ...parsedRouter, trdr: trdr, query: "getCalls" })
    try {
      if (response) {
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
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch();
  }, [state.refresh])



  return (
    <>
      {state.loading ? <Spinner /> : state.data?.length == 0 ? <NoDataView /> : <IncomingCallsBody data={state.data} setRefresh={setState} />}
    </>

  )
}


export default IncomingCalls;