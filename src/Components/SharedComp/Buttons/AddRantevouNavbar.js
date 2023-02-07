import { StyleSheet, Pressable } from "react-native"
import Ion from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../../../shared/COLORS"



const AddRantevouBtn = ({ screen }) => {
  const navigation = useNavigation()
  const onPress = () => {
    navigation.navigate(screen)
  }

  return (
    <Pressable
      style={styles.optionsBtn}
      onPress={onPress}>
      <Ion style={styles.icon} name="add" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  optionsBtn: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: COLORS.secondaryColorShade002,
  },
  icon: {
    fontSize: 30,
    color: COLORS.secondaryColorShade002
  }
})

export default AddRantevouBtn;