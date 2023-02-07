import { Text, StyleSheet } from "react-native";

const CustomText = (props) => {
    return (
        <Text style={[styles.text, props.style]}>{props.children}</Text>
    )
}


const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    }
})

export default CustomText;