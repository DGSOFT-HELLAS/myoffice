import BoldText from "../../Atoms/Text/BoldText";
import { StyleSheet, View } from "react-native";

const InputLabel = (props) => {

  return (
    <View style={styles.view}>
      <BoldText style={styles.text}>{props.title}</BoldText>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 15,
  },
  text: {
    marginBottom: 5,

  }
});

export default InputLabel