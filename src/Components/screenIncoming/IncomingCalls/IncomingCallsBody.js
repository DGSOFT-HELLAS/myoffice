import { View, ScrollView,   SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native"

import { List } from "react-native-paper"
import { ListBodyDataSet, ListTitle, ListBodyView, DescriptionTitle, ListBodyMobile } from "../../SharedComp/List/List"
import Material from 'react-native-vector-icons/MaterialIcons'

import MessageRequest from "./messageRequest"
const IncomingCallsBody = (props) => {
  const description = () => {
    return <DescriptionTitle value={data["Επωνυμία"] ? data["Επωνυμία"] : "Δεν βρέθηκε Επωνυμία"} />
  }

  const Item = ({ data, index }) => {
    return (
      <View key={index}>
        <View style={[styles.itemWrapper]} >
          <List.Accordion
            title={<ListTitle value={data["Ημ/νία Λήψης"]} Icon={Material} iconName="phone-callback" />}
            description={data["Επωνυμία"]}
            descriptionStyle={styles.itemDescription}
            style={{ backgroundColor: 'white' }}
          >
            <ListBody data={data} setRefresh={props.setRefresh} />
          </List.Accordion>
        
        </View>
      </View>
    )
  }


  return (

  <SafeAreaView style={{flex: 1}}> 
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
  </SafeAreaView>

  )
}

const ListBody = ({ data, setRefresh }) => {

  return (
    <ListBodyView>
      {/* <ListBodyDataSet enabled={false} title={'Τηλ. Επικοινωνίας:'} value={data["Τηλ. Επικοινωνίας"]} /> */}
      <ListBodyMobile enabled={false} title={'Τηλ. Επικοινωνίας:'} value={data["Τηλ. Επικοινωνίας"]} />
      <ListBodyDataSet enabled={false} title={'Mήνυμα:'} value={data["Remarks"]} />
      <MessageRequest data={data} setRefresh={setRefresh} />
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