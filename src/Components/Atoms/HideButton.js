import { useState } from "react";
import { COLORS } from "../../shared/COLORS";
import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'


const HideButton = (props) => {

  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.hide, props.style]} >
      {!props.hide ? <AntDesign name="upcircle" style={[styles.icon, props.style]} /> : (
        <AntDesign name="downcircle" style={[styles.icon, props.style]} />
      )}
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  hide: {
    height: '100%',
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',

  },
  icon: {
    fontSize: 16,
    color: COLORS.secondaryColor

  }
});
export default HideButton;