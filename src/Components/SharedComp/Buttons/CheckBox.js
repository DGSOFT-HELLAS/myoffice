import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Text from '../../Atoms/Text';
import { COLORS } from '../../../shared/COLORS';

const CheckboxPaper = ({ setState, title, state, disabled, vip }) => {
  const [checked, setChecked] = React.useState(false);
  console.log(vip)
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
    setChecked(!checked);
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
    <View style={styles.view}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
        disabled={disabled}
      />
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: COLORS.input,
    height: 50,
  }
});

export default CheckboxPaper;