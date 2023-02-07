import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'


const AddScrollView = ({ children }) => {
  return (
    <ScrollView style={styles.view}>
      {children}
    </ScrollView >
  )
}



const styles = StyleSheet.create({
  view: {
    padding: 20,
  }
})

export default AddScrollView;