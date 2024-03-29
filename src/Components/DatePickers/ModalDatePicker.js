import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Atoms/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../shared/COLORS';
import Entypo from 'react-native-vector-icons/Entypo';
import { utcToZonedTime, format } from 'date-fns-tz';


const timeZone = 'Europe/Athens';
const timeZoneOffset = '+02:00';


export const ModalDatePickerComp = ({ day, style, onChange }) => {

  const [show, setShow] = useState(false);
  const showTimepicker = () => {
    setShow(true)
  };



  return (
    <View>
      <ShowTime onPress={showTimepicker} day={day} style={style} />
      {show && (
        <DateTimePicker
          value={new Date(day)}
          mode={'date'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setShow(false)
            onChange(selectedDate)
          }}
        />
      )}
    </View>
  );
};


export const ShowTime = ({ onPress, day, style, leftSide, rightSide }) => {
  const zonedDate = utcToZonedTime(day, timeZone);
  const formattedDate = format(zonedDate, 'dd-MM-yyyy', { timeZone, timeZoneOffset });
  return (
    <TouchableOpacity onPress={onPress} style={[styles.timeContainer, style]}>
      <View style={styles.leftSide}>
        {/* <Text style={[styles.timeText, leftSide]}>{`${date}`}</Text> */}
        <Text style={[styles.timeText, leftSide]}>{formattedDate}</Text>
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