
import React, { useState, createContext } from "react";
import { StyleSheet } from "react-native";
import { fetchAPI } from "../utils/fetchAPI";


const days = ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ']
const month = ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαϊ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"];


export const DayContext = createContext()

const splitDate = (date) => {
  return date.toISOString().split('T')[0]
}





export const DaysContext = ({ children }) => {

  const [day, setDay] = useState();


  const handleDateSingleDayFetch = (day) => {
    // day = new Date(day)
    day = splitDate(day);
    // day.setHours(0,1,1)


    setDay(day)

  }



  const handleFetch = async (start, end) => {
    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/router.php', {
      startDate: start,
      endDate: end,
    })
    setLoading(false)
    setData(res)

  }






  return (
    <DayContext.Provider
      style={styles.container}
      value={{
        day, setDay,
        days, month,
        handleDateSingleDayFetch,
      }}>
      {children}
    </DayContext.Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});