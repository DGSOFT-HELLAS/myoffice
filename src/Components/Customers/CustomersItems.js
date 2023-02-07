import { useState } from "react"
import Text from "../Atoms/Text"
import { View, ScrollView, StyleSheet, Modal, Pressable } from "react-native"
import { List } from "react-native-paper"
import { ListBodyDataSet, ListTitle, ListBodyView, ListBodyButton } from "../SharedComp/List/List"
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native"
import EditButton from "../SharedComp/Buttons/EditButton"
import DeleteButton from "../SharedComp/Buttons/DeleteButton"
import Button from "../SharedComp/Buttons/Button"
import { COLORS } from "../../shared/COLORS"
import { fetchAPI } from "../../utils/fetchAPI"
import CheckboxPaper from "../SharedComp/Buttons/CheckBox"


const CustomerItems = (props) => {
  const navigation = useNavigation()
  const [enabled, setEnabled] = useState(false)


  const onEditBtn = (data) => {
    navigation.navigate('Διόρθωση πελάτη', { data: data })
  }





  return (
    <ScrollView style={styles.container}>
      {props?.data && props?.data.map((data, index) => {
        return (
          <View key={index}>
            <View style={[styles.itemWrapper]} >
              <List.Accordion
                title={<ListTitle value={data["Name"]} Icon={IonIcons} iconName="person" />}
              >
                <ListBody data={data} enabled={enabled} onEditBtn={onEditBtn} setState={props.setState} state={props.state} />
              </List.Accordion>
            </View>
          </View>
        )

      })}
    </ScrollView>

  )
}

const ListBody = ({ data, enabled, onEditBtn, setState, state }) => {


  const onPressDelete = async () => {
    setState((prev) => {
      return {
        ...prev, refresh: true,
      }
    })
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: 'SaveCustomer', action: 'delete', prsn: data["prsn"] })

  }



  return (
    <ListBodyView>
      {/* <ListBodyDataSet enabled={enabled} title={'Διεύθυνση:'} value={data["Address"]} handleChange={handleChange} /> */}
      <ListBodyDataSet enabled={false} title={'Διεύθυνση:'} value={data["Address"]} />
      <ListBodyDataSet enabled={false} title={'Περιοχή:'} value={data["District"]} />
      <ListBodyDataSet enabled={false} title={'Πόλη:'} value={data["City"]} />
      <ListBodyDataSet enabled={false} title={'ΤΚ:'} value={data["Zip"]} />
      <ListBodyDataSet enabled={false} title={'Κινητό:'} value={data["CellPhone"]} />
      <ListBodyDataSet enabled={false} title={'Τηλέφωνο:'} value={data["Phone"]} />
      <ListBodyDataSet enabled={false} title={'Τηλέφωνο2:'} value={data["Phone2"]} />
      <ListBodyDataSet enabled={false} title={'Τηλ. Οικίας:'} value={data["PhoneLocal"]} />
      <ListBodyDataSet enabled={false} title={'Email:'} value={data["Email"]} />
      <ListBodyDataSet enabled={false} title={'Email2:'} value={data["Email2"]} />
      <ListBodyDataSet enabled={false} title={'Fax:'} value={data["Fax"]} />
      <ListBodyDataSet enabled={false} title={'Σχόλια:'} value={data["Comments"]} />
      <CheckboxPaper title={"Vip:"} setState={setState} state={state} disabled={true} vip={data["VIP"]} />
      {/* BUTTON */}
      {/* <ListBodyButton onPress={() => onPress(data)} /> */}

      <View style={styles.buttonView}>
        <EditButton onPress={() => onEditBtn(data)} />
        <ModalCheck title={"Θέλετε σίγουρα να προχωρήσετε σε διαγραφή του πελάτη;"} onPressDelete={onPressDelete} />

      </View>
    </ListBodyView>
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fafafa',
    // backgroundColor: '#fafafa',
  },
  itemDescription: {
    marginTop: 3,
    fontFamily: 'Roboto-Regular'
  },
  itemWrapper: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    elevation: 3,
    marginVertical: 5,
    minHeight: 60,
  },
  itemActive: {
    borderTopWidth: 2,
    borderTopColor: 'green',
  },
  itemExpired: {
    borderTopWidth: 2,
    borderTopColor: 'red',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
  },
  //Style the content of the modal:

  finalDelete: {
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
    justifyContent: 'center'
  }
})


export default CustomerItems