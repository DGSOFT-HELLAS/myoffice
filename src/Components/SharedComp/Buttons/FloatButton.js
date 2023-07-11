import { COLORS } from "../../../shared/COLORS";
import Text from "../../Atoms/Text";
import Ion from 'react-native-vector-icons/Ionicons'
import { FlatList, TouchableOpacity, View, StyleSheet, Platform } from "react-native";

const FloatBtn = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatBtn} onPress={onPress}>
      <Ion name="add" size={20} color={'white'} />
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({

  floatBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.secondaryColor,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.secondaryColorShade001
  }
});
export default FloatBtn;