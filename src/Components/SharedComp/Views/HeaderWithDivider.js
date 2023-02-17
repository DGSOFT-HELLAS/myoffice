import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../shared/COLORS";
import BoldText from "../../Atoms/Text/BoldText";


const HeaderWithDivider = ({ text }) => {
  return (
    <View style={styles.headerView}>
      <BoldText style={styles.header} >{text}</BoldText >
      <View style={styles.divider}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 35,
  },
  header: {
    color: COLORS.secondaryColor,
    fontSize: 19
  },
  divider: {
    width: 20,
    height: 2,
    backgroundColor: COLORS.primaryColor,
    marginTop: 4,
  }
});

export default HeaderWithDivider;