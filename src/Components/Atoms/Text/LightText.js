import { Text, StyleSheet } from "react-native";

const LightText = (props) => {
  return (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
  )
}


const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Light',
  }
})

export default LightText;