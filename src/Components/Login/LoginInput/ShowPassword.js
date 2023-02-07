import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome5';


const ShowPass = ({ bool, action }) => {
  return (
    <IconFont
      name="eye"
      style={bool ? style.eyeIconInactive : style.eyeIconActive}
      onPress={action}
    />
  );
};

const style = StyleSheet.create({
  eyeIconInactive: {
    fontSize: 18,
    marginRight: 15,
  },
  eyeIconActive: {
    fontSize: 18,
    marginRight: 15,
  },
});


export default ShowPass;