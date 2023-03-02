import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../../Atoms/Text';
import FontAws from 'react-native-vector-icons/FontAwesome5'
import { COLORS } from '../../../shared/COLORS';

const CheckBox = ({ isChecked, onPress }) => {

  return (
    <>
      <TouchableOpacity style={styles.containerCheck} onPress={onPress} >
        <View style={styles.checkBox}>
          <Text>
            <FontAws
              style={isChecked ? styles.checkIcon : styles.unCheckedIcon}
              name="check"
            />
          </Text>
        </View>
        <Text >
          Αποθήκευση Χρήστη
        </Text>
      </TouchableOpacity>

    </>
  );
};



const styles = StyleSheet.create({
  containerCheck: {
    flexDirection: 'row',
    // alignItems: 'center',
    color: 'white',
    marginBottom: 20,
    alignItems: 'center',
    width: '100%'
  },
  checkBox: {
    borderColor: COLORS.borderColor,
    borderWidth: 1.5,
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,

  },

  checkIcon: {
    color: COLORS.primaryColor
  },
  unCheckedIcon: {
    color: 'white',
  },
  text: {
    // color: COLORS.lightGrey
    marginLeft: 5,
  },

});

export default CheckBox;