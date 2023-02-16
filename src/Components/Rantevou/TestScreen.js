import { useState, useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DayContext } from "../../useContext/daysContext";
import { fetchAPI } from "../../utils/fetchAPI";




const TestScreen = () => {
  const { day, setDay } = useContext(DayContext)
  const navigation = useNavigation()

  const [raw, setRaw] = useState({
    eoppy: 0,
    date: '2023-03-03',
    fromTime: '2023-03-03T07:00:00',
    toTime: '2023-03-03T08:00:00',
    soaction: '1131738',
    reason: 'customer'
  })

  const handlePost = async () => {
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: "RescheduleRDV", ...raw })
    setDay('2023-03-03')
    navigation.navigate('DayViewCalendarMain');

  }


  return (
    < TouchableOpacity onPress={handlePost}>
      <Text>Reschedule</Text>
    </ TouchableOpacity>
  )

}

export default TestScreen;