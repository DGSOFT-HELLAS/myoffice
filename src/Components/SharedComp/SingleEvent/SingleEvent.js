import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useState, memo } from 'react';
import Enty from 'react-native-vector-icons/Entypo'
import BoldText from '../Text/BoldText';
import { COLORS } from '../../../shared/COLORS';
import ModalFullEvent from '../../Rantevou/DayViewCalendarMain/ModalView';



export const FlatlistItem = memo(({ data }) => {
  return (
    <View
      style={[
        styles.itemWrapper,
        data.color === "LightSteelBlue" && styles.lightSteelBlue,
        data.color === "LimeGreen" && styles.limeGreen,
        data.color === "Silver" && styles.silver,
        data.color === "lightred" && styles.lightred,
        data.personal == 1 && styles.pink
      ]}>
      <ModalFullEvent data={data} isVisible={isVisible} setIsVisible={setIsVisible} state={state} setState={setState} />

    </View>

  )
})

export const SingleEvent = memo(({ data }) => {
  const [isVisible, setIsVisible] = useState(false)
  const onPress = () => {
    setIsVisible(prev => !prev)
  }
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.itemWrapper,
          data.color === "LightSteelBlue" && styles.lightSteelBlue,
          data.color === "LimeGreen" && styles.limeGreen,
          data.color === "Silver" && styles.silver,
          data.color === "lightred" && styles.lightred,
          data.personal == 1 && styles.pink
        ]}>
        <View style={styles.topView}>
          <Enty name="calendar" size={17} color={COLORS.secondaryColor} />
          <BoldText style={styles.hourText} >{`${data["Ημ/νία"]} - ${data["'Ωρα"]}`}</BoldText>
        </View>
        <View>
          <Text>{data['Πελάτης'] ? data['Πελάτης'] : "Δεν υπάρχει όνομα"}</Text>
        </View>
        <ModalFullEvent event={data} isVisible={isVisible} setIsVisible={setIsVisible} />
      </TouchableOpacity>
    </>
  )
})






const styles = StyleSheet.create({
  itemWrapper: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    elevation: 3,
    marginVertical: 5,
    borderTopWidth: 3,
  },
  lightSteelBlue: {
    borderTopColor: '#718FCE',
  },
  limeGreen: {
    borderTopColor: '#2ab61a',
  },
  silver: {
    borderTopColor: 'silver',
  },
  lightred: {
    borderTopColor: 'red',
  },
  pink: {
    borderTopColor: 'pink',
  },
  orange: {
    borderTopColor: 'orange',
  },
  ///new flatlist item
  flatItem: {
    backgroundColor: 'white',
    padding: 10,
    minHeight: 70,
    justifyContent: 'center'
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  hourText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black'
  }


});

