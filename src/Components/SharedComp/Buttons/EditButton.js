import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from "../../../shared/COLORS";

const EditButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Feather name="edit" size={18} color="white" />
    </TouchableOpacity>
  )
}




const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: COLORS.secondaryColor,
  }
});

export default EditButton;