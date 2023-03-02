import { useState } from "react";
import Button from "../Buttons/Button";
import { View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from "../../../shared/COLORS";
import Text from "../../Atoms/Text";

const Cancel = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign style={styles.closeIcon} name="closecircle" />
    </TouchableOpacity>
  )
}


const ModalCheck = ({ subscriberReschedule, customerReschedule, title, Element, elementStyle }) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(subscriberReschedule)
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer} >
          <View style={styles.modalView} >
            <Text>{title}
            </Text>
            <Button style={styles.modalBtn} text={"Πελάτη"} onPress={() => {
              setModalVisible(false);
              customerReschedule();

            }} />
            <Button style={styles.modalBtn} text={"Συνδρομητή"} onPress={() => {
              setModalVisible(false)
              subscriberReschedule();
            }} />
            <Cancel onPress={() => setModalVisible(false)} />
          </View>
        </View>

      </Modal>
      <Element onPress={() => setModalVisible(true)} style={elementStyle} />
    </>
  )
}




const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    padding: 10,
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    width: '80%',
    backgroundColor: COLORS.secondaryColor,
    border: 'none',
    marginBottom: 10,
  },
  closeIcon: {
    marginTop: 10,
    color: '#E1341E',
    fontSize: 30,
  }
});


export default ModalCheck;