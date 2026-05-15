import { useState, useEffect, useContext, memo } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, Keyboard, KeyboardAvoidingView, Platform, Modal } from 'react-native'
import Text from "../../Atoms/Text";
import React from 'react'
import { COLORS } from '../../../shared/COLORS';
//Import Icons:
import { UserContext } from '../../../useContext/useContect';
import { fetchAPI } from '../../../utils/fetchAPI'
import InputLabel from '../../SharedComp/Views/InputLabel';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ion from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';


const ModalView = ({ title, query, setState, updateValue, hideLabel, addClient }) => {
  const { trdr } = useContext(UserContext);
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [value, setValue] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  const [search, setSearch] = useState('');

  const [item, setItem] = useState(null)


  const showModal = () => {
    setVisible(true)

  };
  const hideModal = () => {
    Keyboard.dismiss()
    setVisible(false)
  };


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = data.filter(function (item) {
        let title = item[Object.keys(item)[1]]
        const itemData = title
          ? title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };


  const handleFetch = async () => {
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { trdr: trdr, query: query })
    try {
      if (response) {
        setData(response)
        setFilteredDataSource(response);
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log({ data })

  useEffect(() => {
    handleFetch();
    const unsubscribe = navigation.addListener('focus', () => {
      handleFetch();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;

  }, [navigation])



  const RenderItem = ({ item, index }) => {
    const onPress = () => {
      let key = Object.keys(item)[1]
      let value = item[`${key}`]
      setValue(value)
      setState((prevState) => {
        return {
          ...prevState, [updateValue]: item.id
        }
      })
      hideModal()
    }
    return (
      <TouchableOpacity onPress={onPress}>
        <ListItem item={item} />
      </TouchableOpacity>
    )
  };



  return (
    <>
      {/* Input component */}
      <InputLabel title={hideLabel ? null : title}>
        <TouchableOpacity onPress={showModal} style={styles.addInput}>
          {hideLabel && <AntDesign name="search1" size={20} />}
          {<Text>{value}</Text>}
          <AntDesign name="down" size={18} />
        </TouchableOpacity>
      </InputLabel >
      {/* Modal that opens and fetches data -> available customers, available services */}
      <Modal visible={visible} animationType="slide" onRequestClose={hideModal}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.containerStyle}>
          <View style={styles.searchRow}>
            <View style={styles.searchView}>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Αναζήτηση"
              />
            </View>
            {addClient &&
              <TouchableOpacity style={styles.addIcon} onPress={() => {
                Keyboard.dismiss()
                navigation.navigate('Προσθήκη πελάτη')
              }}>
                <Ion name="person-add-sharp" size={20} color={COLORS.secondaryColor} />
              </TouchableOpacity>}
            <TouchableOpacity style={styles.closeIcon} onPress={hideModal}>
              <AntDesign name="close" size={24} color={COLORS.deleteBtn} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredDataSource}
            renderItem={RenderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={Seperator}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.listContent}
            maxToRenderPerBatch={20}
            initialNumToRender={13}
            updateCellsBatchingPeriod={10}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </KeyboardAvoidingView>
      </Modal>

    </>

  )
}
const Seperator = () => {
  return (
    <View style={styles.seperator}></View>
  )
}

const ListItem = memo(({ item }) => {
  let value = Object.keys(item)[1]

  return (
    <View style={styles.radioListView}>
      <Text style={styles.listItemText}>{item[`${value}`]}</Text>
    </View>
  )
})




const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
  },
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
  },
  searchRow: {
    flexDirection: 'row',
    padding: 10,
  },
  searchView: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '',
    borderRadius: 4,
    paddingLeft: 5,
    flex: 1,
  },
  addInput: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryColorShade003,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    // marginTop: 5,
    // marginBottom: 10,
  },
  radioListView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60,
  },
  seperator: {
    width: '100%',
    height: 2,
    backgroundColor: '#d9d9d9'
  },
  listItemText: {
    color: '#656666'
  },
  textInputStyle: {
  },
  listContent: {
    paddingBottom: 24,
  },
  addIcon: {
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,

  },
  closeIcon: {
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  }

})


export default ModalView;