import { memo } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { List } from "react-native-paper"
import { ListTitle } from "../SharedComp/List/List"
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native"


const CustomerItems = (props) => {
  const navigation = useNavigation()

  const Item = memo(({ data, index }) => {
    const handlePress = () => {
      navigation.navigate('CustomersView', { data: data })
    };

    return (
      <View key={index}>
        <View style={[styles.itemWrapper]} >
          <List.Item
            style={{ height: 60, justifyContent: 'center' }}
            onPress={handlePress}
            title={<ListTitle value={data["Name"]} Icon={IonIcons} iconName="person" />}
          />
        </View>
      </View>
    )
  })


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
        { length: 60, offset: 60 * index, index }
      )}
    />


  )
}


const styles = StyleSheet.create({
  itemWrapper: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    elevation: 3,
    marginVertical: 5,

  },
})

export default CustomerItems