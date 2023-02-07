import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Text from '../../Atoms/Text';
import { COLORS } from '../../../shared/COLORS';

const CheckboxPaper = ({ title, handleCheckBox }) => {
  const [checked, setChecked] = React.useState(false);

  const onPress = () => {
    setChecked(!checked);
    handleCheckBox(title);
  }


  return (
    <View style={styles.view}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
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