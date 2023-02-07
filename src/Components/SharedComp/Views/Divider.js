import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../shared/COLORS";

const Divider = () => {
  return <View style={styles.divider}></View>
}

const styles = StyleSheet.create({
  divider: {
    width: 20,
    height: 2,
    backgroundColor: COLORS.primaryColor,
    marginTop: 4,
  }
});

export default Divider;