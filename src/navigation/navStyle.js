import { View, StyleSheet, TouchableOpacity, } from "react-native"
import Fontisto from 'react-native-vector-icons/Fontisto';
import Material from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { COLORS } from '../shared/COLORS';
import { useRoute } from "@react-navigation/native";
import MediumText from "../Components/Atoms/Text/MediumText";
import { SafeAreaView } from "react-native";


const NavStyle = ({ navigation, showback, title, }) => {





  const ToggleMenu = () => {
    navigation.openDrawer()
  }

  const goBack = () => {
    console.log('press go back');
    navigation.goBack()
  }
  return (
    <SafeAreaView>
      <View style={styles.navView}>
        <View style={styles.leftView}>
          <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('Home')} >
            <Entypo name="home" color={COLORS.secondaryColorShade002} size={21} />
          </TouchableOpacity>
          {showback && (
            <TouchableOpacity style={styles.goBack} onPress={goBack} >
              <Material name="keyboard-backspace" color="white" size={21} />
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
    </SafeAreaView>

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
    minHeight: 80,
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
    marginLeft: 5,
    marginRight: 10,
    width: 30,
    height: 30,
    justifyContent: 'center'
  },
  home: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: COLORS.secondaryColorShade002
  }
});

export default NavStyle;