import { Text, StyleSheet } from "react-native";

const BoldText = (props) => {
  return (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
  )
}


const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
  }
})

export default BoldText;