import { useContext, useState, memo, useEffect } from "react"
import { View, FlatList } from "react-native"

import { ListTitle, DescriptionTitle } from "../../SharedComp/List/List"
import { List } from "react-native-paper"
import Enty from 'react-native-vector-icons/Entypo'
import { ListBodyRantevou } from "../ListBody"
import { styles } from "../styles"

const DayViewBody = ({ data, setState }) => {

  const [enabled, setEnabled] = useState(false)

  const onPress = () => {
    setEnabled((prev) => !prev)
  }

  const Item = ({ data }) => {
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
          <ListBodyRantevou data={data} enabled={enabled} onPress={onPress} />
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




export default DayViewBody;