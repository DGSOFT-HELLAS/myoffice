import { useContext, useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { List } from "react-native-paper"


import Enty from 'react-native-vector-icons/Entypo'
import { ListTitle, DescriptionTitle } from "../../SharedComp/List/List"
import { ListBodyRantevou } from "./ListBody"
import { styles } from "../styles"

const DayViewBody = ({ data, handleFetch, setState }) => {

  const [enabled, setEnabled] = useState(false)
  const onPress = () => {
    setEnabled((prev) => !prev)
  }

  return (
    <ScrollView style={styles.container}>
      {data && data.map((data, index) => {

        return (
          <View key={index}>
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
                <ListBodyRantevou data={data} enabled={enabled} onPress={onPress} handleFetch={handleFetch} setState={setState} />
              </List.Accordion>
            </View>


          </View>
        )

      })}
    </ScrollView>

  )
}






// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     // backgroundColor: '#ddeaf8',
//     backgroundColor: COLORS.backgroundColor
//   },
//   itemDescription: {
//     marginTop: 3,
//     fontFamily: 'Roboto-Regular'
//   },
//   itemWrapper: {
//     marginHorizontal: 10,
//     backgroundColor: 'white',
//     elevation: 3,
//     marginVertical: 5,
//   },
//   itemActive: {
//     borderTopWidth: 2,
//     borderTopColor: 'green',
//   },
//   itemExpired: {
//     borderTopWidth: 2,
//     borderTopColor: 'red',
//   },
//   limeGreen: {
//     borderTopWidth: 2,
//     borderTopColor: 'pink',
//   }


// })


export default DayViewBody;