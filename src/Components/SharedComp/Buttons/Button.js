import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, } from 'react-native';
import Spinner from '../../Atoms/ActivityIndicator';
import { COLORS } from '../../../shared/COLORS';



const Button = props => {
  return (
    <>
      <TouchableOpacity
        style={[styles.button, props.style]}
        onPress={props.onPress}>
        <View>
          {props.loading ? (
            <Spinner />
          ) : (
            <Text style={styles.buttonText}>{props.text}</Text>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 5,
    marginTop: 2,
  },
  button: {
    padding: 12,
    elevation: 8,
    backgroundColor: COLORS.primaryColor,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default Button;