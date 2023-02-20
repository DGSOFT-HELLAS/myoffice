import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Atoms/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTime } from '../../utils/getTime';
import { COLORS } from '../../shared/COLORS';
import { constructDate } from '../../utils/dateFunctions/constructDate';
import { utcToZonedTime, format } from 'date-fns-tz';


const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';


export const ModalTimePickerComp = ({ handleState, style, time }) => {
  const [date, setDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState();
  const [show, setShow] = useState(false);



  const onChange = (event, selectedDate) => {
    setShow(false)

    const zonedDate = utcToZonedTime(selectedDate, timeZone);
    const formattedTime = format(zonedDate, 'HH:mm', { timeZone, timeZoneOffset });
    const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss', { timeZone, timeZoneOffset });
    setDisplayDate(formattedTime)
    setDate(formattedDate)
    handleState(formattedDate)


  };




  useEffect(() => {
    let date;
    if (time) {
      date = new Date(time);
    } else {
      date = new Date()
    }
    const zonedDate = utcToZonedTime(date, timeZone);
    const formattedTime = format(zonedDate, 'HH:mm', { timeZone, timeZoneOffset });
    const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss', { timeZone, timeZoneOffset });

    setDisplayDate(formattedTime.toString())

    setDate(formattedDate)
    handleState(formattedDate)


  }, [time])


  const showTimepicker = () => {
    setShow(true)
  };

  return (
    <View>
      <ShowTime onPress={showTimepicker} date={displayDate} style={style} />
      {show ? (
        <DateTimePicker
          value={new Date(date)}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
        />
      ) : null}

    </View>
  );
};


export const ShowTime = ({ date, onPress, style }) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.timeContainer, style]}>
      <View style={styles.leftSide}>
        <Text style={styles.timeText}>{date}</Text>
      </View>
      <View style={styles.rightSide}>
        <AntDesign style={styles.icon} name="clockcircle" />
      </View>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    width: 130,
    height: 45,
    padding: 3,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
  },
  leftSide: {
    width: '65%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center'
  },
  rightSide: {
    width: '35%',
    height: '100%',
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  timeText: {
    fontSize: 17,
  },
  icon: {
    fontSize: 18,
    color: 'white'
  }

});