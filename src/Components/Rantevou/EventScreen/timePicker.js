import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Text from '../../Atoms/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTime } from '../../../utils/getTime';
import { COLORS } from '../../../shared/COLORS';
import { utcToZonedTime, format } from 'date-fns-tz';

const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';




export const TimePicker = ({ handleState, style, propsTime, minTime, day }) => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(propsTime)

  const dateString = `2023-02-22T${propsTime}`;
  const d = new Date(dateString);
  const zonedDate = utcToZonedTime(d, timeZone);
  console.log(typeof zonedDate)
  // const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss', { timeZone, timeZoneOffset });

  const showTimepicker = () => {
    setShow(true)
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    let time = getTime(selectedDate);
    setTime(time)
    handleState(time)

  };

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.iosView}>
        <DateTimePicker
          value={zonedDate}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
          minimumDate={minTime}
          minuteInterval={5}
        />
      </View>

    )
  }

  return (
    <View>
      <ShowTime onPress={showTimepicker} date={time} style={style} />
      {show && (
        <DateTimePicker
          value={zonedDate}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
          minimumDate={minTime}
          minuteInterval={5}
        />
      )}

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
    width: 160,
    height: 45,
    padding: 3,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  leftSide: {
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightSide: {
    width: '30%',
    maxWidth: 60,
    height: '100%',
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  timeText: {
    fontSize: 17,
    color: 'black'
  },
  icon: {
    fontSize: 18,
    color: 'white'
  },
  iosView: {
    display: 'flex',
    alignItems: 'flex-start'

  }

});