import { useState } from "react";
import Text from "../Atoms/Text";
import { StyleSheet, Modal, Pressable, View, TouchableOpacity } from "react-native"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../shared/COLORS";
import AntDesign from 'react-native-vector-icons/AntDesign'


const NavButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            < MenuBtn navigate={'Ραντεβού: Εβδομάδα'} text={'Eβδομάδα'} setModal={setModalVisible} />
            < MenuBtn navigate={'DayView'} text={'Μέρα'} setModal={setModalVisible} />
            < MenuBtn navigate={'AppointmentsHistory'} text={'Δυναμική Αναζήτηση'} setModal={setModalVisible} />
            <CloseIcon setModal={setModalVisible} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Material style={styles.calendarIcon} name="calendar-blank-multiple" />
      </TouchableOpacity>

    </>

  )
}

const MenuBtn = ({ navigate, text, setModal }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.optionsBtn}
      onPress={() => {
        setModal(false)
        navigation.navigate(navigate)
      }}>
      <Text style={styles.btnText}>{text} </Text>
    </Pressable>
  )
}

const CloseIcon = ({ setModal }) => {
  return (
    <Pressable
      onPress={() => setModal(false)}>
      <AntDesign style={styles.closeIcon} name="closecircle" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // backgroundColor: '#535353',
  },
  modalView: {
    margin: 20,
    width: 240,
    position: 'absolute',
    right: '2%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // width: '80%',
  },
  button: {
    // backgroundColor: COLORS.primaryColor,
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: COLORS.secondaryColorShade002,
    padding: 10,
    elevation: 2,
    width: 35,
    height: 35,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  calendarIcon: {
    fontSize: 14,
    color: 'white',
    color: COLORS.secondaryColorShade002
  },
  optionsBtn: {
    width: '100%',
    height: 45,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  btnText: {
    color: 'white'
  },
  closeIcon: {
    marginTop: 10,
    color: '#E1341E',
    fontSize: 30,
  }
});
export default NavButton;