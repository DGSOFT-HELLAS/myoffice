import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../../Atoms/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../../shared/COLORS';
import Entypo from 'react-native-vector-icons/Entypo';


export const DatePickerComp = ({ day, style, onChange }) => {
  // console.log(day)
  // const [date, setDate] = useState()
  // if (day === day.toLocaleDateString()) {
  //   setDate(day)
  // }
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(day)



  const showTimepicker = () => {
    setShow(true)
  };



  return (
    <View>
      <ShowTime onPress={showTimepicker} day={day} style={style} date={date} />
      {show && (
        <DateTimePicker
          value={new Date(date)}
          mode={'date'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setShow(false)
            setDate(selectedDate)
            onChange(selectedDate)

          }}
        />
      )}
    </View>
  );
};


export const ShowTime = ({ onPress, style, leftSide, rightSide, date }) => {
  console.log('---------------------------------')
  console.log(typeof date)
  // if (typeof date !== 'string') {
  //   console.log('is object')
  //   date = new Date(day).toLocaleDateString()
  //   console.log(date)
  // }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.timeContainer, style]}>
      <View style={styles.leftSide}>
        {/* <Text style={[styles.timeText, leftSide]}>{`${date}`}</Text> */}
        <Text style={[styles.timeText, leftSide]}>{date.toLocaleDateString()}</Text>
      </View>
      <View style={[styles.rightSide, rightSide]}>
        <Entypo style={styles.icon} name="calendar" />
      </View>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    width: 160,
    height: 45,
    padding: 3,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    justifyContent: 'space-between'
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
    fontSize: 19,
    color: 'white'
  }

});