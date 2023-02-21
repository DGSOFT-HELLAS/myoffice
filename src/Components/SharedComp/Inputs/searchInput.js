import { useState } from "react"
import { View, StyleSheet, TextInput } from 'react-native'
import Text from "../../Atoms/Text"
import BoldText from "../../Atoms/Text/BoldText"
import { COLORS } from "../../../shared/COLORS"


const SearchInput = (props) => {
  return (
    <>
      <BoldText style={styles.text}>{props.title}</BoldText>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderWidth: 0.5,
    borderColor: COLORS.secondaryColorShade002,
    backgroundColor: 'white',
    elevation: 1,
    borderRadius: 3,
    paddingLeft: 10,
    marginBottom: 12,

  },
  text: {
    marginBottom: 5,
  }
});

export default SearchInput