import { memo } from "react"
import { View, StyleSheet, FlatList, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { List } from "react-native-paper"
import { ListTitle } from "../SharedComp/List/List"
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../../shared/COLORS"

const CustomerItems = (props) => {
  const navigation = useNavigation()

  const Item = memo(({ data, index }) => {
    const handlePress = () => {
      navigation.navigate('CustomersView', { data: data })
    };   
   
    return (
          <TouchableOpacity onPress={handlePress} style={styles.itemWrapper}>
              <IonIcons style={styles.icon} name={'person'}  />
              <Text style={styles.textList}>{data.Name}</Text>
          </TouchableOpacity>
    )
  })


  return (
    <SafeAreaView style={{flex: 1}}> 
    <FlatList
      data={props.data}
      style={{padding: 10, backgroundColor: '#e9e9e9'}}
      renderItem={({ item, index }) => <Item index={index} data={item} />}
      keyExtractor={(item, index) => {
        return index;
      }}
      initialNumToRender={10}
      maxToRenderPerBatch={20}
    />
    </ SafeAreaView>

  )
}

const styles = StyleSheet.create({
      itemWrapper: {
          elevation: 1,
          display: 'flex',
          marginBottom: 4,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 15,
          marginBottom: 5,
      },
      icon: {
        marginRight: 4,
        fontSize: 15,
        color: COLORS.secondaryColor,
      },
      textList: {
        lineHeight: 20,
      }
})

export default CustomerItems