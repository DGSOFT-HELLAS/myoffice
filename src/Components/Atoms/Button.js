import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "./Text";



const EditButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
      <Text style={props.textStyle}>{props.children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    justifyContent: 'center',
    width: 100,
    alignItems: 'center'
  }
});

export default EditButton;