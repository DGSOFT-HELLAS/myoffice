import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
import Text from "../../Atoms/Text";
import React from 'react'
import { Modal, RadioButton, Portal, Provider } from 'react-native-paper';
import { COLORS } from '../../../shared/COLORS';
//Import Icons:
import { UserContext } from '../../../useContext/useContect';
import { fetchAPI } from '../../../utils/fetchAPI'
import InputLabel from '../../SharedComp/Views/InputLabel';
import AntDesign from 'react-native-vector-icons/AntDesign'

const ModalView = ({ title, query, setState, updateValue, hideLabel }) => {
  const [data, setData] = useState([])
  const [value, setValue] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const { trdr } = useContext(UserContext);

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
        // console.log(response)
        setData(response)
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

  const HandleTitle = () => {
    if (title) {
      let cleanTitle = title.split('*')[1]
      return (
        <Text>{cleanTitle}</Text>
      )
    }
  }

  return (
    <InputLabel title={hideLabel ? null : title}>
      <TouchableOpacity onPress={showModal} style={styles.addInput}>
        {hideLabel && <AntDesign name="search1" size={20} />}
        {<Text>{value[Object.keys(value)[1]]}</Text>}
        <AntDesign name="down" size={18} />
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
    </InputLabel >


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
    marginBottom: 10,
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
  }

})


export default ModalView;