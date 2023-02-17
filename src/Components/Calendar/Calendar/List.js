import { useContext, useState, memo, useEffect } from "react"
import { View, FlatList, Text } from "react-native"
import { fetchAPI } from "../../../utils/fetchAPI"
import { ListTitle, DescriptionTitle } from "../../SharedComp/List/List"
import { List } from "react-native-paper"
import Enty from 'react-native-vector-icons/Entypo'
import { ListBodyRantevou } from "../../Rantevou/ListBody"
import { styles } from "../../Rantevou/styles"
import { DayContext } from "../../../useContext/daysContext"
import { UserContext } from "../../../useContext/useContect"
import { useNavigation } from "@react-navigation/native"

const ListView = () => {
  const { trdr } = useContext(UserContext)
  const { day } = useContext(DayContext);
  const navigation = useNavigation();

  const [state, setState] = useState({
    data: [],
    loading: false,
    delete: false,
    refresh: false,
    stelexos: 0,
  })




  const handleFetch = async () => {
    setState((prev) => {
      return {
        ...prev, loading: true
      }
    })

    let res = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', {
      startDate: new Date(),
      endDate: "",
      trdr: trdr,
      stelexos: state.stelexos,
      query: "wpFetchRDVForCalendar"
    })

    setState((prev) => {
      return {
        ...prev, loading: false, data: res
      }
    })


  }

  useEffect(() => {
    handleFetch()
  }, [])



  return (
    <>
      <View>
        <Event data={state.data} setState={setState} />
      </View>
    </>
  )
}


const Event = ({ data, setState }) => {

  const [enabled, setEnabled] = useState(false)

  const onPress = () => {
    setEnabled((prev) => !prev)
  }

  const Item = ({ data, setState }) => {
    return (
      <View
        style={[
          styles.itemWrapper,
          data.color === "LightSteelBlue" && styles.lightSteelBlue,
          data.color === "LimeGreen" && styles.limeGreen,
          data.color === "Silver" && styles.silver,
          data.color === "lightred" && styles.lightred,
          data.personal == 1 && styles.pink
        ]} >
        <List.Accordion
          description={<DescriptionTitle value={data['Πελάτης'] ? data['Πελάτης'] : "Δεν βρέθηκε όνομα"} />}
          descriptionStyle={styles.itemDescription}
          title={<ListTitle value={`${data["Ημ/νία"]} - ${data["'Ωρα"]}`} Icon={Enty} iconName="calendar" />}
          style={{ backgroundColor: 'white' }}
        >
          <ListBodyRantevou data={data} enabled={enabled} onPress={onPress} setState={setState} />
        </List.Accordion>
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Item index={index} data={item} setState={setState} />}
        keyExtractor={(item, index) => {
          return index;
        }}
        initialNumToRender={12}
      />


    </>
  )
}


export default ListView;


