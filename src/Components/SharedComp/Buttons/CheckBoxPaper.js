import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Text from '../../Atoms/Text';
import { COLORS } from '../../../shared/COLORS';

const CheckboxPaperNew = ({ title, isChecked, disabled, onPress }) => {
  const [check, setCheck] = useState(isChecked)

  const handlePress = () => {
    setCheck(!check)
    onPress()
  }



  return (
    <View style={styles.view}>
      <Checkbox
        status={check ? 'checked' : 'unchecked'}
        onPress={handlePress}
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

export default CheckboxPaperNew;