import { useState, useContext, useEffect } from "react";
import ChooseDates from "../../SharedComp/ChooseDates/ChoseDates";
import { UserContext } from "../../../useContext/useContect";
import { fetchAPI } from "../../../utils/fetchAPI";
import Spinner from "../../Atoms/ActivityIndicator";
import NoDataView from "../../Atoms/View/NoDataView";
import IncomingEltaBody from "./EltaBody";
import { useRoute } from "@react-navigation/native";


const IncomingElta = () => {
  const { trdr } = useContext(UserContext);
  const router = useRoute()
  let parsedRouter = JSON.parse(router.params.state)
  const [state, setState] = useState({
    data: [],
    loading: true
  });





  const handleFetch = async () => {
    setState((prevState) => {
      return {
        ...prevState, loading: true
      }
    })
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { ...parsedRouter, trdr: trdr, query: "getCourier" })
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
        // setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch();
  }, [])


  return (
    <>
      {state.loading ? <Spinner /> : state.data?.length == 0 ? <NoDataView /> : <IncomingEltaBody data={state.data} />}
    </>

  )
}


export default IncomingElta;