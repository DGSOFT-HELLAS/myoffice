import { useState } from "react"
import Text from "../../Atoms/Text"
import { StyleSheet, View, Modal, Pressable } from "react-native"
import { ListBodyView, ListBodyDataSet } from "../../SharedComp/List/List"
import { COLORS } from "../../../shared/COLORS"
import { useNavigation } from "@react-navigation/native"
import DeleteButton from "../../SharedComp/Buttons/DeleteButton"
import EditButton from "../../SharedComp/Buttons/EditButton"
import Button from "../../SharedComp/Buttons/Button"
import { fetchAPI } from "../../../utils/fetchAPI"
import AntDesign from 'react-native-vector-icons/AntDesign'

export const ListBodyRantevou = ({ data, setState }) => {
  const navigation = useNavigation()

  const [raw, setRaw] = useState({
    soaction: data["soaction"],
  })


  const onEditBtn = (data) => {
    navigation.navigate('Διόρθωση ραντεβού', { data: data })
  }


  const subscriberReschedule = () => {
    handlePost('subscriber');

  }
  const customerReschedule = () => {
    handlePost('customer');
  }


  const handlePost = async (reason) => {
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: "CancelRDV", reason: reason, ...raw })
    if (setState) {
      setState(prev => {
        return {
          ...prev, delete: !prev.delete
        }
      })
    }
  }

  return (
    <ListBodyView>
      <ListBodyDataSet title={'Στέλεχος'} value={data["Στέλεχος"]} enabled={false} />
      <ListBodyDataSet title={'Ύπηρεσία/Τύπος'} value={data["Ύπηρεσία/Τύπος"]} enabled={false} />
      <ListBodyDataSet title={'Σημείο'} value={data["Σημείο"]} enabled={false} />
      <ListBodyDataSet title={'Κατάσταση'} value={data["Κατάσταση"]} enabled={false} />
      <ListBodyDataSet title={'Σχόλια'} value={data["Σχόλια"]} enabled={false} />

      <View style={styles.buttonView}>
        <EditButton onPress={() => onEditBtn(data)} />
        <ModalCheck title={"Aκύρωση από:"} Element={DeleteButton} elementStyle={{ marginLeft: 10 }} subscriberReschedule={subscriberReschedule} customerReschedule={customerReschedule} />

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
    marginBottom: 15,
    marginTop: 15,
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
  topView: {
    padding: 2,
    marginBottom: 10,
  },
  closeView: {
    padding: 10,
    alignItems: 'center',
  },
  closeIcon: {
    color: COLORS.deleteBtn
  }

});