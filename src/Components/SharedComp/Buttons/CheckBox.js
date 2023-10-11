import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Text from '../../Atoms/Text';
import { COLORS } from '../../../shared/COLORS';
import CheckIcon from 'react-native-vector-icons/AntDesign'

const CheckboxPaper = ({ setState, title, state, disabled, vip}) => {
  const [checked, setChecked] = React.useState(false);
    console.log(checked)
  useEffect(() => {
    if (state.eoppy == 1) {
      setChecked(true);
    }
    //from DayViewCalendarMain -> ModalView
    if (state == 1) {
      setChecked(true);
    }
    if (vip == 1) {
      console.log('is VIP')
      setChecked(true);
    }
    if (vip == 0) {
      console.log('not vip')
    }

  }, [])

  const onPress = () => {
    if(!disabled) {
      setChecked((prev) => !prev );
    }
    //
    if (title === 'EΟΠΠΥ') {
      if (state.eoppy == 1) {
        setState((prevState) => {
          return {
            ...prevState, eoppy: 0
          }
        })
      }
      if (state.eoppy == 0) {
        setState((prevState) => {
          return {
            ...prevState, eoppy: 1
          }
        })
      }
    }
    //
    if (title === 'ΠΡΟΣΩΠΙΚΟ' || title === 'Προσωπικό') {
      if (state.personal == 1) {
        setState((prevState) => {
          return {
            ...prevState, personal: 0
          }
        })
      }
      if (state.personal == 0) {
        setState((prevState) => {
          return {
            ...prevState, personal: 1
          }
        })
      }
    }
    //
    if (title === 'vip') {
      if (state.vip == 1) {
        setState((prevState) => {
          return {
            ...prevState, vip: 0
          }
        })
      }
      if (state.vip == 0) {
        setState((prevState) => {
          return {
            ...prevState, vip: 1
          }
        })
      }
    }
    //
  }


  return (
    <TouchableOpacity style={styles.view}  onPress={onPress}>
        <View  disabled={disabled} style={styles.checkboxContainer} >
            {checked ? <CheckIcon name= "check"/> : null}
        </View >
        <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: COLORS.input,
    height: 50,
    padding: 8,
  },
  checkboxContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
  }
  
});

export default CheckboxPaper;