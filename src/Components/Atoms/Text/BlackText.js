import { Text, StyleSheet } from "react-native";

const BlackText = (props) => {
  return (
    <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
  )
}


const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Black',
  }
})

export default BlackText;