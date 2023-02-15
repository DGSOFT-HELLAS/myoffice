import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Atoms/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTime } from '../../utils/getTime';
import { COLORS } from '../../shared/COLORS';
import { constructDate } from '../../utils/dateFunctions/constructDate';
export const ModalTimePickerComp = ({ handleState, style, time }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);




  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   const d = getTime(selectedDate);

  //   handleState(selectedDate)
  //   setDate(currentDate);
  //   setShow(false);
  // };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const d = getTime(selectedDate);
    //this is what we save to the state to send the request. we want the full date here.
    let date = constructDate(selectedDate)
    console.log(date)
    handleState(date)
    setDate(currentDate);
    setShow(false)
  };

  useEffect(() => {
    if (time) {
      setDate(time)
    }

  }, [time])


  const showTimepicker = () => {
    setShow(true)

  };

  return (
    <View>
      <ShowTime onPress={showTimepicker} date={new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} style={style} />
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