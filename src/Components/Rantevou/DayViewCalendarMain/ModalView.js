import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, Pressable } from "react-native";
import { COLORS } from "../../../shared/COLORS";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ListBodyDataSet, ListBodyView } from "../../SharedComp/List/List";
import DeleteButton from "../../SharedComp/Buttons/DeleteButton";
import Button from "../../SharedComp/Buttons/Button";
import EditButton from "../../SharedComp/Buttons/EditButton";
import { ModalDatePickerComp } from "../../DatePickers/ModalDatePicker";

import { useNavigation } from "@react-navigation/native";



const ModalFullEvent = ({ isVisible, setIsVisible, event }) => {
  const navigation = useNavigation()

  const onEditBtn = (data) => {
    navigation.navigate('Διόρθωση ραντεβού', { data: data })
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text>{event.title}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <AntDesign name="closecircle" size={20} color={'#ea2a15'} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyView}>
          <ListBody data={event} onEditBtn={onEditBtn} />

        </View>
      </View>
    </Modal>
  );
}

const onDateChange = (selected) => {

}

const ListBody = ({ data, onEditBtn }) => {
  const [enabled, setEnabled] = useState(false);

  const handleEdit = () => {
    setEnabled((prev) => !prev)
  }
  return (
    <ListBodyView>
      <ListBodyDataSet title={'Στέλεχος'} value={data["Στέλεχος"]} enabled={enabled} />
      <ListBodyDataSet title={'Ύπηρεσία/Τύπος'} value={data["Ύπηρεσία/Τύπος"]} enabled={enabled} />
      <ListBodyDataSet title={'Σημείο'} value={data["Σημείο"]} enabled={enabled} />
      <ListBodyDataSet title={'Κατάσταση'} value={data["Κατάσταση"]} enabled={enabled} />
      <ListBodyDataSet title={'Σχόλια'} value={data["Σχόλια"]} enabled={enabled} />
      <ModalDatePickerComp day={data.start} onChange={onDateChange} />
      <View style={styles.buttonView}>
        {/* <EditButton onPress={() => onEditBtn(data)} /> */}
        <EditButton onPress={() => onEditBtn(data)} />
        <ModalCheck title={"Aκύρωση από:"} Element={DeleteButton} elementStyle={{ marginLeft: 10 }} />

        {/* subscriberReschedule={subscriberReschedule} customerReschedule={customerReschedule} */}
      </View>


    </ListBodyView>
  )
}


const ModalCheck = ({ subscriberReschedule, customerReschedule }) => {
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
        <View style={styles.modalContainer} >
          <View style={styles.modalView} >
            <View style={styles.topView}>
              <Text>Επαναπρογραμματισμός Ραντεβού από:</Text>
            </View>
            <Button style={styles.modalBtn} text={"Πελάτη"} onPress={() => {
              setModalVisible(false);
              customerReschedule();


            }} />
            <Button style={styles.modalBtn} text={"Συνδρομητή"} onPress={() => {
              setModalVisible(false)
              subscriberReschedule();
            }} />
            <View style={styles.closeView}>
              <CloseIcon setModal={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <DeleteButton onPress={() => setModalVisible(true)} style={{ marginLeft: 10 }} />

    </>
  )
}

const CloseIcon = ({ setModal }) => {
  return (
    <Pressable
      onPress={() => setModal(false)}>
      <AntDesign style={styles.closeIcon} name="closecircle" size={30} />
    </Pressable>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  topView: {
    height: 60,
    padding: 15,
    width: "100%",
    flexDirection: 'row',
    backgroundColor: "#e7e7e7",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  bodyView: {
    flex: 1,
    padding: 10,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    borderWidth: 2,
    backgroundColor: '#ea2a15'

  },
  buttonView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  katastasiView: {
    height: 50,
    backgroundColor: COLORS.input,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
    padding: 10,

  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 3,
    minHeight: 200,
    // padding: 10,
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
    border: 'none',
    padding: 10,
    minWidth: 80,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 10,
  },

  closeView: {
    padding: 10,
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },


});

export default ModalFullEvent;