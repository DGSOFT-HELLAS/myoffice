import { Text, StyleSheet } from "react-native";

const MediumText = (props) => {
  return (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
  )
}


const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
  }
})

export default MediumText;