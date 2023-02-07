
import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import BoldText from '../../Atoms/Text/BoldText'
import { COLORS } from '../../../shared/COLORS'


const AddInput = (props) => {
  return (
    <View style={styles.view}>
      <BoldText style={styles.text}>{props.title}</BoldText>
      <TextInput
        multiline={props.multiline}
        style={[styles.input, props.styles, props.enabled && styles.inputDisabled]}
        onChangeText={props.onChangeText}
        value={props.value}
        editable={props.enabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    maxWidth: 600,
    width: '100%',
    marginBottom: 20,

  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: COLORS.input,
    color: 'grey',
    borderRadius: 2,
    marginTop: 5,

  },
  text: {
    fontSize: 15,
  },
  inputDisabled: {
    backgroundColor: '#4992b6',
  },


})

export default AddInput