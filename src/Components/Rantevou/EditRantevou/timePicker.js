import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../../Atoms/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTime } from '../../../utils/getTime';
import { COLORS } from '../../../shared/COLORS';

export const ModalTimePicker = ({ handleState, style, propsTime, minTime }) => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(propsTime)
  const date = new Date();


  const showTimepicker = () => {
    setShow(true)
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    let time = getTime(selectedDate);
    setTime(time)
    handleState(time)

  };







  return (
    <View>
      <ShowTime onPress={showTimepicker} date={time} style={style} />
      {show && (
        <DateTimePicker
          value={date}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
          minimumDate={minTime}
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