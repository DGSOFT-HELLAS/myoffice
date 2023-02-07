import { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { List } from "react-native-paper"
import { ListBodyDataSet, ListTitle, ListBodyView } from "../../SharedComp/List/List"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const IncomingEltaBody = (props) => {

  const [enabled, setEnabled] = useState(false)
  const onPress = () => {
    setEnabled(prev => !prev)
  }
  return (
    <ScrollView style={styles.container}>
      {props?.data && props?.data.map((data, index) => {
        return (
          <View key={index}>
            <View style={[styles.itemWrapper]} >
              <List.Accordion
                title={<ListTitle value={data["Ημ/νία"]} Icon={Material} iconName="email-fast-outline" />}
                style={{ backgroundColor: 'white' }}
              >
                <ListBody data={data} />
              </List.Accordion>
            </View>
          </View>
        )

      })}
    </ScrollView>

  )
}

const ListBody = ({ data }) => {
  return (
    <ListBodyView>
      <ListBodyDataSet enabled={false} title={'Λεπτομέριες:'} value={data["ΛΕΠΤΟΜΕΡΕΙΕΣ"]} />


      {/* <ListBodyButton onPress={onPress} enabled={enabled} /> */}
    </ListBodyView>
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
  },
  itemActive: {
    borderTopWidth: 2,
    borderTopColor: 'green',
  },
  itemExpired: {
    borderTopWidth: 2,
    borderTopColor: 'red',
  },
})


export default IncomingEltaBody;