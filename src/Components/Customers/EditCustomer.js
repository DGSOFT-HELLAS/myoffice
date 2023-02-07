import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../useContext/useContect";
import { StyleSheet, ScrollView } from "react-native"
import Button from "../SharedComp/Buttons/Button";
import AddView from "../SharedComp/Views/AddView";
import { COLORS } from "../../shared/COLORS";
import AddInput from "../SharedComp/Inputs/AddInput";
import HeaderWithDivider from "../SharedComp/Views/HeaderWithDivider";
import CheckboxPaper from "../SharedComp/Buttons/CheckBox";
import { fetchAPI } from "../../utils/fetchAPI";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
const EditCustomer = () => {
  //Data coming from individual customer, previous screen
  const { trdr } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  let routeData = route.params.data;

  const [state, setState] = useState({
    data: [],
    loading: false,
    edit: false,
  });
  const [raw, setRaw] = useState({
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
    prsn: '',
  })


  const handleChange = (text, key) => {
    // console.log(text)
    setRaw((prev) => {
      return {
        ...prev, [key]: text
      }
    })
  }


  const handlePost = async () => {
    setState((prev) => {
      return {
        ...prev, loading: true
      }
    })
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: 'SaveCustomer', trdr: trdr, action: 'update', ...raw })
    console.log(response);

    setState((prev) => {
      return {
        ...prev, loading: false
      }
    })
    navigation.navigate('Πελάτες');
  }


  useEffect(() => {
    for (const [key, value] of Object.entries(routeData)) {
      setRaw((prev) => {
        return {
          ...prev, [key]: value
        }
      })
    }
  }, [])



  return (
    <ScrollView style={styles.scrollView} >
      <AddView>
        <HeaderWithDivider text={"Στοιχεία Πελάτη"} />
        <CheckboxPaper title={"vip"} setState={setState} state={state} />
        <AddInput title="Ονοματεπώνυμο:" value={raw.Name} onChangeText={(text) => { handleChange(text, 'Name') }} />
        <AddInput title="Διεύθυνση:" value={raw.Address} onChangeText={(text) => { handleChange(text, 'Address') }} />
        <AddInput title="Περιοχή:" value={raw.District} onChangeText={(text) => { handleChange(text, 'District') }} />
        <AddInput title="Πόλη:" value={raw.City} onChangeText={(text) => { handleChange(text, 'City') }} />
        <AddInput title="TK:" value={raw.Zip} onChangeText={(text) => { handleChange(text, 'Zip') }} />
        <HeaderWithDivider text={"Eπικοινωνία"} />
        <AddInput title="Τηλέφωνο:" value={raw.Phone} onChangeText={(text) => { handleChange(text, 'Phone') }} />
        <AddInput title="Tηλέφωνο2:" value={raw.Phone2} onChangeText={(text) => { handleChange(text, 'Phone2') }} />
        <AddInput title="Κινητό:" value={raw.CellPhone} onChangeText={(text) => { handleChange(text, 'CellPhone') }} />
        <AddInput title="Τηλ.Οικίας:" value={raw.PhoneLocal} onChangeText={(text) => { handleChange(text, 'PhoneLocal') }} />
        <AddInput title="FAX:" value={raw.FAX} onChangeText={(text) => { handleChange(text, 'FAX') }} />
        <AddInput title="Email:" value={raw.Email} onChangeText={(text) => { handleChange(text, 'Email') }} />
        <AddInput title="Email2:" value={raw.Email2} onChangeText={(text) => { handleChange(text, 'Email2') }} />
        <AddInput title="WebPage:" value={raw.Webpage} onChangeText={(text) => { handleChange(text, 'Webpage') }} />
        <AddInput title="Παρατηρήσεις:" value={raw.Comments} onChangeText={(text) => { handleChange(text, 'Comments') }} multiline={true} />
        <Button style={styles.btn} text={"Αποθήκευση"} onPress={handlePost} lodading={state.loading} />

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


});


export default EditCustomer;