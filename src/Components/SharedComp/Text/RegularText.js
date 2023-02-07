import { Text, StyleSheet } from "react-native";

const RegularText = (props) => {
    return (
        <Text style={[styles.text, props.style]}>{props.children}</Text>
    )
}


const styles = StyleSheet.create({
    text: {
      fontFamily: 'Roboto-Regular',
    }
})

export default RegularText;