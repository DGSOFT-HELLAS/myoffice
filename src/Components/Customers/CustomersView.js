import { useState } from "react";
import { StyleSheet, View, Modal, ScrollView } from "react-native";
import Text from "../Atoms/Text";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ListBodyDataSet, ListBodyView, ListBodyMobile } from "../SharedComp/List/List";
import CheckboxPaperNew from "../SharedComp/Buttons/CheckBoxPaper";
import EditButton from "../SharedComp/Buttons/EditButton";
import { COLORS } from "../../shared/COLORS";
import Button from "../SharedComp/Buttons/Button";
import DeleteButton from "../SharedComp/Buttons/DeleteButton";


const CustomersView = () => {

  const route = useRoute();
  const navigation = useNavigation()
  const data = route.params.data;

  const onPressDelete = async () => {
    await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: 'SaveCustomer', action: 'delete', prsn: data["prsn"] })
  }

  const onEditBtn = () => {
    navigation.navigate('Διόρθωση πελάτη', { data: data })
  }
  return (
    <ScrollView>
      <ListBodyView>
        <CheckboxPaperNew title={"vip"} isChecked={data["VIP"] == 1 ? true : false} disabled={true} />
        <ListBodyDataSet enabled={false} title={'Διεύθυνση:'} value={data["Address"]} />
        <ListBodyDataSet enabled={false} title={'Περιοχή:'} value={data["District"]} />
        <ListBodyDataSet enabled={false} title={'Πόλη:'} value={data["City"]} />
        <ListBodyDataSet enabled={false} title={'ΤΚ:'} value={data["Zip"]} />
        <ListBodyMobile enabled={false} title={'Κινητό:'} value={data["CellPhone"]} />
        <ListBodyMobile enabled={false} title={'Τηλέφωνο:'} value={data["Phone"]} />
        <ListBodyMobile enabled={false} title={'Τηλέφωνο2:'} value={data["Phone2"]} />
        <ListBodyMobile enabled={false} title={'Τηλ. Οικίας:'} value={data["PhoneLocal"]} />
        <ListBodyDataSet enabled={false} title={'Email:'} value={data["Email"]} />
        <ListBodyDataSet enabled={false} title={'Email2:'} value={data["Email2"]} />
        <ListBodyDataSet enabled={false} title={'Fax:'} value={data["Fax"]} />
        <ListBodyDataSet enabled={false} title={'Σχόλια:'} value={data["Comments"]} />
        <View style={styles.buttonView}>
          <EditButton onPress={() => onEditBtn(data)} />
          <ModalCheck title={"Θέλετε σίγουρα να προχωρήσετε σε διαγραφή του πελάτη;"} onPressDelete={onPressDelete} />
        </View>
      </ListBodyView>
    </ScrollView>
  )
}




const ModalCheck = ({ title, onPressDelete }) => {
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
              <Text style={{ color: 'white' }}>Eπιβεβαίωση</Text>
            </View>
            <View style={styles.middleView}>
              <Text>{title}</Text>
            </View>
            <View style={styles.bottomView}>
              <Button style={[styles.modalBtn, styles.finalDelete]} text={"Nαι"} onPress={() => {
                onPressDelete();
                setModalVisible(false);
              }} />
              <Button style={[styles.modalBtn, styles.cancelDelete]} text={"'Oχι"} onPress={() => {
                setModalVisible(false)
              }} />
            </View>
          </View>
        </View>
      </Modal>
      <DeleteButton onPress={() => setModalVisible(true)} style={{ marginLeft: 10 }} />
    </>
  )
}


const styles = StyleSheet.create({

  accordionItem: {
    marginBottom: 10,
  },

  itemDescription: {
    marginTop: 3,
    fontFamily: 'Roboto-Regular'
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    // backgroundColor: 'red'
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
  }, finalDelete: {
    backgroundColor: COLORS.deleteBtn,
    marginRight: 5,
  },
  cancelDelete: {
    backgroundColor: COLORS.secondaryColor,
    marginLeft: 5,
  },

  topView: {
    backgroundColor: COLORS.deleteBtn,
    padding: 15,
    alignItems: 'center',
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  middleView: {
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    width: '100%',
  }



})


export default CustomersView;