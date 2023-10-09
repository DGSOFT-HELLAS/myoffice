import { Text, StyleSheet } from "react-native";

const CustomBoldText = ({children, style}) => {
  return (
    <Text style={[styles.text, style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
  }
})

export default CustomBoldText;