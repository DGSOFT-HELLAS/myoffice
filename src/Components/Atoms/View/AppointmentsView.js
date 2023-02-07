import { View, StyleSheet } from "react-native";
import { COLORS } from "../../../shared/COLORS";

const AppointmentsView = (props) => {
  return (
    <View style={[styles.view, props.style]}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    minHeight: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 10,
    elevation: 2,
    borderRadius: 5,
    borderTopWidth: 2,
    borderWidth: 1,
    borderTopColor: COLORS.secondaryColor,
    borderColor: COLORS.secondaryColorShade002,
    borderRadius: 4,
  }
});

export default AppointmentsView;