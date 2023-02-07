import React, { useState } from "react"
import { StyleSheet, TextInput } from "react-native"
import { COLORS } from "../../../shared/COLORS"
import InputLabel from "../../SharedComp/Views/InputLabel"

const CommentInput = ({ setState }) => {
  const [text, setText] = useState()

  const onChangeText = (text) => {
    setText(text)
    setState((prevState) => {
      return {
        ...prevState, comments: text
      }
    })
  };

  return (

    <InputLabel title="Παρατηρήσεις:">
      <TextInput
        editable
        multiline={true}
        numberOfLines={2}
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
      />
    </InputLabel>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.input,
    padding: 10,
  },
  text: {
    marginTop: 5,
  }
});
export default CommentInput;