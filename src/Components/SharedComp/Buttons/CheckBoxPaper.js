import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Text from '../../Atoms/Text';
import { COLORS } from '../../../shared/COLORS';
import CheckIcon from 'react-native-vector-icons/AntDesign'
const CheckboxPaperNew = ({ title, isChecked, disabled, onPress }) => {
  const [check, setCheck] = useState(isChecked)

  const handlePress = () => {
    if(!disabled) {
      setCheck(!check)
    }
    onPress && onPress()
  }

  

  return (
    <TouchableOpacity  style={styles.view}  onPress={handlePress}>
    <View  disabled={disabled} style={styles.checkboxContainer} >
        {check ? <CheckIcon name= "check"/> : null}
    </View >
    <Text>{title}</Text>
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
  },
  checkbox: {
    backgroundColor: 'red',
    width: '40px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iosView: {
    border: 1
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
    marginRight: 10,
  }
});

export default CheckboxPaperNew;