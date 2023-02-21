import { View, StyleSheet, Text, TouchableOpacity, } from "react-native"
import NavButton from '../Components/NavButton/NavButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Material from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../shared/COLORS';
import { useRoute } from "@react-navigation/native";
import MediumText from "../Components/Atoms/Text/MediumText";
import AddRantevouBtn from "../Components/SharedComp/Buttons/AddRantevouNavbar";



const NavStyle = ({ navigation, showback, title, showDayModal, dontShowAdd }) => {


  const route = useRoute();


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
        {route.name === 'Πελάτες' ? <AddRantevouBtn screen='Προσθήκη πελάτη' /> : null}
        {showDayModal && (
          <>
            {!dontShowAdd && <AddRantevouBtn screen='AddRantevou' />}
          </>
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
    // color: '#5f6060',
    color: 'white',
    letterSpacing: 0.1
  },
  goBack: {
    marginRight: 10,
  }
});

export default NavStyle;