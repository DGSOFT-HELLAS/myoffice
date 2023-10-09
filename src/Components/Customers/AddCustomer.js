import { useState, useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native"
import Button from "../SharedComp/Buttons/Button";
import AddView from "../SharedComp/Views/AddView";
import { COLORS } from "../../shared/COLORS";
import AddInput from "../SharedComp/Inputs/AddInput";
import HeaderWithDivider from "../SharedComp/Views/HeaderWithDivider";
import CheckboxPaper from "../SharedComp/Buttons/CheckBox";
import { UserContext } from "../../useContext/useContect";
import { fetchAPI } from "../../utils/fetchAPI";
import { useNavigation } from "@react-navigation/native";
import CheckboxPaperNew from "../SharedComp/Buttons/CheckBoxPaper";

const AddCustomer = () => {

  const { trdr } = useContext(UserContext)
  const navigation = useNavigation();
  const [state, setState] = useState({
    vip: 0,
    Name: '',
    Address: '',
    District: '',
    City: '',
    Zip: '',
    Phone: '',
    Phone2: '',
    CellPhone: '',
    PhoneLocal: '',
    FAX: '',
    Email: '',
    Email2: '',
    Webpage: '',
    Comments: '',
  })
 

  const handleChange = (text, key) => {
    setState((prev) => {
      return {
        ...prev, [key]: text
      }
    })
  }



  const handleBtn = async () => {

    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: 'SaveCustomer', action: 'insert', trdr: trdr, ...state })
    try {
      if (response) {
        navigation.goBack()

      }
    } catch (error) {
      console.log(error)
    }

  }

  const onCheckboxPress = () => {
    if (state.vip == 0) {
      setState((prev) => { return { ...prev, vip: 1 } })
    }

    if (state.vip == 1) {
      setState((prev) => { return { ...prev, vip: 0 } })
    }

  }
  return (
    <ScrollView style={styles.scrollView} >
      {/* <HeaderView Icon={FontAws} iconName={"calendar-plus-o"} title="Προσθήκη Ραντεβού" /> */}
      <AddView>
        <HeaderWithDivider text={"Στοιχεία Πελάτη"} />
        <CheckboxPaperNew title={"vip"} isChecked={false} disabled={false} onPress={onCheckboxPress} />
        {/* <CheckboxPaper title={"vip"} setState={setState} state={state} /> */}
        <AddInput title="Ονοματεπώνυμο:" value={state.Name} onChangeText={(text) => { handleChange(text, 'Name') }} />
        <AddInput title="Διεύθυνση:" value={state.Address} onChangeText={(text) => { handleChange(text, 'Address') }} />
        <AddInput title="Περιοχή:" value={state.District} onChangeText={(text) => { handleChange(text, 'District') }} />
        <AddInput title="Πόλη:" value={state.City} onChangeText={(text) => { handleChange(text, 'City') }} />
        <AddInput title="TK:" value={state.Zip} onChangeText={(text) => { handleChange(text, 'Zip') }} />
        <HeaderWithDivider text={"Eπικοινωνία"} />
        <AddInput title="Τηλέφωνο:" value={state.Phone} onChangeText={(text) => { handleChange(text, 'Phone') }} />
        <AddInput title="Tηλέφωνο2:" value={state.Phone2} onChangeText={(text) => { handleChange(text, 'Phone2') }} />
        <AddInput title="Κινητό:" value={state.CellPhone} onChangeText={(text) => { handleChange(text, 'CellPhone') }} />
        <AddInput title="Τηλ.Οικίας:" value={state.PhoneLocal} onChangeText={(text) => { handleChange(text, 'PhoneLocal') }} />
        <AddInput title="FAX:" value={state.FAX} onChangeText={(text) => { handleChange(text, 'FAX') }} />
        <AddInput title="Email:" value={state.Email} onChangeText={(text) => { handleChange(text, 'Email') }} />
        <AddInput title="Email2:" value={state.Email2} onChangeText={(text) => { handleChange(text, 'Email2') }} />
        <AddInput title="WebPage:" value={state.Webpage} onChangeText={(text) => { handleChange(text, 'Webpage') }} />
        <AddInput title="Παρατηρήσεις:" value={state.Comments} onChangeText={(text) => { handleChange(text, 'Comments') }} multiline={true} />

        <View style={styles.btnView}>
          <Button style={styles.btn} text={"Αποθήκευση"} onPress={handleBtn} />
          <Button style={styles.cancelBtn} text={"Aκύρωση"} onPress={() => navigation.goBack()} />
        </View>
      </AddView>
    </ScrollView >
  )
}


const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
  },
  btn: {
    borderRadius: 2,
    width: 150,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 20,
  },
  cancelBtn: {
    width: '45%',
    backgroundColor: COLORS.deleteBtn,
    marginLeft: 5,
  },
  btnView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }


});


export default AddCustomer;