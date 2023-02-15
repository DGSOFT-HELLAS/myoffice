import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
import Text from '../Atoms/Text';
import React from 'react'
import { Modal, RadioButton, Portal, Provider } from 'react-native-paper';
import { COLORS } from '../../shared/COLORS';
import BoldText from '../Atoms/Text/BoldText';
//Import Icons:
import { UserContext } from '../../useContext/useContect';
import { fetchAPI } from '../../utils/fetchAPI'
import InputLabel from '../SharedComp/Views/InputLabel';
import AntDesign from 'react-native-vector-icons/AntDesign'

const ModalPersons = ({ query, setState, updateValue }) => {
  const [data, setData] = useState([])
  const [value, setValue] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const { trdr } = useContext(UserContext);

  // console.log('---------------------------------------- MODAL PERSONS DATA ----------------------------------')
  // console.log(data)
  // console.log('------------------------------------------------------------------------------------------------')

  const showModal = () => {
    setVisible(true)

  };
  const hideModal = () => {
    setVisible(false)
  };

  const onValueChange = (newValue) => {

    setValue(newValue)
    setState((prevState) => {
      return {
        ...prevState, [updateValue]: newValue["id"]
      }
    })
    hideModal()
  }

  const handleFetch = async () => {
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { trdr: trdr, query: query })
    try {
      if (response) {
        setData([{ id: 0, Name2: 'Όλα' }, ...response,])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch();

  }, [])

  const RenderItem = ({ item, index }) => {
    return (
      <ListItem item={item} />)

  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showModal} style={styles.addInput}>
        <View style={styles.leftView}>
          <BoldText style={{ marginRight: 5 }}>Στέλεχος:</BoldText>
          {<Text>{value[Object.keys(value)[1]] ? value[Object.keys(value)[1]] : "Όλα"}</Text>}
        </View>
        <View style={styles.searchIcon}>
          <AntDesign name="search1" size={17} color={'white'} />
        </View>
      </TouchableOpacity>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle} style={styles.modalBackgroundStyle} >
          <RadioButton.Group onValueChange={newValue => onValueChange(newValue)} value={value.id}>
            <FlatList
              data={data}
              renderItem={RenderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Seperator}

            />

          </RadioButton.Group>
        </Modal>
      </Portal>
    </View>


  )
}
const Seperator = () => {
  return (
    <View style={styles.seperator}></View>
  )
}

const ListItem = ({ item }) => {
  let value = Object.keys(item)[1]

  return (
    <View style={styles.radioListView}>
      <Text style={styles.listItemText}>{item[`${value}`]}</Text>
      <RadioButton value={item} />
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.secondaryColorShade002,
    elevation: 2,
  },

  modalBackgroundStyle: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  containerStyle: {
    backgroundColor: 'white',
    // padding: 20,
    margin: 10,
  },
  addInput: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    // marginTop: 5,
    // marginBottom: 10,
  },
  radioListView: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  seperator: {
    width: '100%',
    height: 2,
    backgroundColor: 'black'
  },
  listItemText: {
    color: '#656666'
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 35,
    height: 35,
    backgroundColor: COLORS.secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.secondaryColorShade002,
    elevation: 10
  }

})

export default ModalPersons;