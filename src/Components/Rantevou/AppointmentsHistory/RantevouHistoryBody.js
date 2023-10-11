import { View, ScrollView, StyleSheet, FlatList } from "react-native"
import { useState } from "react"
import { List } from "react-native-paper"
import { ListTitle, DescriptionTitle } from "../../SharedComp/List/List"
import Enty from 'react-native-vector-icons/Entypo'
import { ListBodyRantevou } from "../ListBody"
import { styles } from "../styles"
const RantevouListBody = ({ data, setState }) => {
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
          description={data['Πελάτης'] ? data['Πελάτης'] : "Δεν βρέθηκε όνομα"}
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

    <FlatList
      data={data}
      renderItem={({ item }) => <Item data={item} setState={setState} />}
      keyExtractor={(item, index) => {
        return index;
      }}
      initialNumToRender={8}
    />

  )
}




export default RantevouListBody;