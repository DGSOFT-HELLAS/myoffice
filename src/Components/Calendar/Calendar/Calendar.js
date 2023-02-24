import { Calendar } from 'react-native-calendars';
import { useState, useEffect, useContext } from 'react';
import { fetchAPI } from '../../../utils/fetchAPI';
import { UserContext } from '../../../useContext/useContect';
import { format, lastDayOfMonth } from 'date-fns'
import { DayContext } from '../../../useContext/daysContext';
import { useNavigation } from '@react-navigation/native';
import Locales from '../Locales';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../../../shared/COLORS';

const CalendarMonth = () => {
  const { trdr } = useContext(UserContext)
  const { setDay, day } = useContext(DayContext)
  const navigation = useNavigation()
  const [events, setEvents] = useState()
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: '',
    stelexos: 0,
  })

  const route = useRoute();



  const handleFetch = async () => {
    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      query: 'wpFetchRDVMonth',
      startDate: state.startDate,
      endDate: state.endDate,
      trdr: trdr,
      stelexos: state.stelexos

    })
    console.log(res)
    const items = {};
    for (let event of res) {
      if (!items[key]) {
        items[key] = {};
      }
      const key = new Date(event.RDVdate).toISOString().split('T')[0]
      items[key] = { marked: true, dotColor: 'green', activeOpacity: 0 }
    }
    setEvents(items)
  }



  useEffect(() => {
    var today = new Date();
    const firstDateOfMonth = format(today, 'yyyy-MM-01')
    const lastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd')
    setState((prev) => {
      return {
        ...prev, startDate: firstDateOfMonth, endDate: lastDateOfMonth
      }
    })
  }, [])


  useEffect(() => {
    handleFetch();
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      handleFetch();
    });

    return unsubscribe;
  }, [state.startDate, state.endDate, navigation])




  return (
    <>
      <Calendar
        markedDates={events}
        onMonthChange={month => {
          let today = new Date(month.dateString);
          const firstDateOfMonth = format(today, 'yyyy-MM-01')
          const lastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd')
          setState((prev) => {
            return {
              ...prev, startDate: firstDateOfMonth, endDate: lastDateOfMonth
            }
          })
        }}
        onDayPress={(day) => {
          let date = day.dateString
          setDay(date)
          navigation.navigate('DayViewCalendarMain', { date: date })
        }}
      />
      {/* {route.params.show && (
        <FlatList
          data={null}
          keyExtractor={(item, index) => index}
          renderItem={(item) => {
            return (
              <>
                <View style={styles.dayViewContainer}>
                  <View style={styles.titleRantevouToday}>
                    <AntDesign name="clockcircleo" color={COLORS.secondaryColor} />
                    <Text>Ραντεβού Σήμερα:</Text>
                  </View>
                  <ListView setState={setState} />
                </View>
              </>
            )
          }}
        />
      )} */}

    </>

  )
}





const styles = StyleSheet.create({
  titleRantevouToday: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 150,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
    borderWidth: 0.6,
    borderColor: COLORS.secondaryColorShade001,
    borderRadius: 4,
  },
  dayViewContainer: {

  }
})
export default CalendarMonth;