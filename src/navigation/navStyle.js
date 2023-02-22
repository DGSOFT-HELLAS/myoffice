import { View, StyleSheet, TouchableOpacity, } from "react-native"
import Fontisto from 'react-native-vector-icons/Fontisto';
import Material from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../shared/COLORS';
import { useRoute } from "@react-navigation/native";
import MediumText from "../Components/Atoms/Text/MediumText";



const NavStyle = ({ navigation, showback, title, }) => {





  const ToggleMenu = () => {
    navigation.openDrawer()
  }

  return (
    <View style={styles.navView}>
      <View style={styles.leftView}>
        {showback && (
          <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()} >
            <Material name="keyboard-backspace" color="white" size={19} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.rightView}>
        <MediumText style={styles.name}>{title}</ MediumText  >
        <TouchableOpacity style={styles.burgerContainer} onPress={ToggleMenu}>
          <Fontisto name="nav-icon-a" style={styles.burger} />
        </TouchableOpacity>
      </View>

    </View>
  )
}




const styles = StyleSheet.create({
  navView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'black',
    zIndex: 4,
    elevation: 3,
    height: 90

  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    fontSize: 20,
    marginRight: 2,
    color: 'black'
  },
  touchableIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  burgerContainer: {
    borderWidth: 0.4,
    borderRadius: 2,
    borderColor: COLORS.secondaryColorShade002,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  burger: {
    fontSize: 20,
    color: COLORS.secondaryColorShade002
  },
  name: {
    marginRight: 15,
    color: 'white',
    letterSpacing: 0.1
  },
  goBack: {
    marginRight: 10,
  }
});

export default NavStyle;