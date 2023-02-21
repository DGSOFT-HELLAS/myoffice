import { View, ScrollView, StyleSheet, FlatList } from "react-native"
import { List } from "react-native-paper"
import { ListBodyDataSet, ListTitle, ListBodyView, DescriptionTitle } from "../../SharedComp/List/List"
import Material from 'react-native-vector-icons/MaterialIcons'

const IncomingCallsBody = (props) => {


  const Item = ({ data, index }) => {
    return (
      <View key={index}>
        <View style={[styles.itemWrapper]} >
          <List.Accordion
            title={<ListTitle value={data["Ημ/νία Λήψης"]} Icon={Material} iconName="phone-callback" />}
            description={<DescriptionTitle value={data["Επωνυμία"] ? data["Επωνυμία"] : "'Δεν βρέθηκε Επωνυμία'"} />}
            descriptionStyle={styles.itemDescription}
            style={{ backgroundColor: 'white' }}
          >
            <ListBody data={data} />
          </List.Accordion>
        </View>
      </View>
    )
  }



  return (

    <FlatList
      data={props.data}
      renderItem={({ item, index }) => <Item index={index} data={item} />}
      keyExtractor={(item, index) => {
        return index;
      }}
      initialNumToRender={10}
      maxToRenderPerBatch={20}
      getItemLayout={(data, index) => (
        { length: 73.8, offset: 73.8 * index, index }
      )}
    />

  )
}

const ListBody = ({ data }) => {
  return (
    <ListBodyView>
      <ListBodyDataSet enabled={false} title={'Τηλ. Επικοινωνίας:'} value={data["Τηλ. Επικοινωνίας"]} />
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

})


export default IncomingCallsBody;