import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../../Atoms/Text';


const ClearButton = ({ handleLogout }) => {
  return (
    <>
      <Text style={[styles.clearLog]} onPress={handleLogout}>
        Clear Login Data
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  clearLog: {
    color: '#000000',
    textDecorationLine: 'underline',
    marginTop: 15,
    marginBottom: 5,
  },
});

export default ClearButton;
