import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../useContext/useContect";
import { fetchAPI } from "../../utils/fetchAPI";
import CustomerItems from "./CustomersItems";
import Spinner from "../Atoms/ActivityIndicator";
import NoDataView from "../Atoms/View/NoDataView";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Customers = () => {
  const { trdr } = useContext(UserContext);
  const isFocused = useIsFocused();


  const [state, setState] = useState({
    data: [],
    loading: false,
    refresh: false,
  })
  console.log(state.refresh)


  const handleFetch = async () => {
    setState((prev) => {
      return {
        ...prev, loading: true
      }
    })
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/fetchClients.php', { trdr: trdr })

    try {
      if (response) {
        console.log(response)
        setState((prev) => {
          return {
            ...prev, data: response
          }
        })
        setState((prev) => {
          return {
            ...prev, loading: false, refresh: false
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch();
    console.log(state)
  }, [isFocused, state.refresh])


  return (
    <>
      {state.loading ? <Spinner /> : state.data?.length == 0 ? <NoDataView /> : <CustomerItems data={state.data} setState={setState} state={state} />}


    </>
  )
}

export default Customers;