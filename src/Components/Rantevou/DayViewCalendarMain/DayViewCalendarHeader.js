import { useState, useContext, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { constructGreekDate } from "../../../utils/dateFunctions/constructGreekDay"
import { Calendar } from 'react-native-calendars';
import Entypo from 'react-native-vector-icons/Entypo'
import { DayContext } from "../../../useContext/daysContext";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../shared/COLORS";
import ColorLoader from "./ColorLoader";
const DayViewCalendarHeader = ({ date, setState, state }) => {
  const [show, setShow] = useState(false)
  const { day, setDay } = useContext(DayContext)
  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate('Calendar', { show: false })
  }


  let greekDate = constructGreekDate(date)
  let newDateGreeekDate = constructGreekDate(new Date())

  return (
    <>
      <View style={styles.container}>
        <View style={styles.view}>
          <View >
            {/* //route.params.date */}
            <Text style={styles.date}>{date ? greekDate : newDateGreeekDate}</Text>
          </View>
          <TouchableOpacity style={styles.calendarButton} onPress={onPress}>
            <Entypo name="calendar" size={18} color={'white'} />
          </TouchableOpacity>
        </View>
        <ColorLoader loading={state.loading} />
      </View>

    </>
  )
}




const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    backgroundColor: 'white',
    elevation: 2,
  },

  view: {
    padding: 10,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  calendarView: {
    width: '100%',
    top: 60,
    position: 'absolute',
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10,
  },
  calendarButton: {
    backgroundColor: COLORS.secondaryColor,
    width: 35,
    height: 35,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondaryColorShade001
  },
  date: {
    borderRadius: 4,
    color: 'black'
  }
})

export default DayViewCalendarHeader;