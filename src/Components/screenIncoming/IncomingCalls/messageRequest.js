import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { COLORS } from "../../../shared/COLORS"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useState, useEffect } from "react"
import { fetchAPI } from "../../../utils/fetchAPI"
import { ListBodyDataSet } from "../../SharedComp/List/List"
import BoldText from "../../Atoms/Text/BoldText"

const MessageRequest = ({ data, setRefresh }) => {
  console.log(data)
  console.log(setRefresh)
  const [state, setState] = useState({
    show: false,
    data: [],
    text: ''
  })


  const onChangeText = (text) => {
    setState(prev => {
      return {
        ...prev, text: text
      }
    })
    console.log(text)
  }

  const handleFetch = async () => {

    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: "getRequest", soaction: data.callID })

    try {
      if (response[0].remarks) {
        setState(prev => {
          return {
            ...prev, data: response[0], text: response[0].remarks ? response[0].remarks : ''
          }
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleOnPress = () => {
    handleFetch()
    setState(prev => {
      return {
        ...prev, show: !prev.show
      }
    })
  }

  const onPressSaveMessage = async () => {
    let query;
    if (data.status == 0) {
      query = "createRequest"
    } else {
      query = "updateRequest"
    }


    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { query: query, callID: data.callID, remarks: state.text })

    try {
      console.log(response)
      setRefresh(prev => {
        return {
          ...prev, refresh: !prev.refresh
        }
      })
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <View style={styles.iconView}>
      {data.status == 0 && (
        <TouchableOpacity onPress={handleOnPress} style={[styles.icon, styles.fileIcon]}>
          <AntDesign name="addfile" size={20} color="white" />
        </TouchableOpacity >
      )}
      {data.status > 0 && (
        <TouchableOpacity onPress={handleOnPress} style={[styles.icon, styles.messageIcon]}>
          <AntDesign name="message1" size={20} color="white" />
        </TouchableOpacity >
      )}
      {state.show && (
        <View style={styles.collapsedMessageView}>
          <BoldText style={styles.title}>Αίτημα:</BoldText>
          <TextInput style={[styles.input]} multiline={true} onChangeText={(text) => onChangeText(text)} value={state.text} />
          <TouchableOpacity onPress={onPressSaveMessage} style={styles.saveMessage}>
            <Text style={{ color: 'white' }}>Αποθήκευση</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}


const styles = StyleSheet.create({

  iconView: {
    marginVertical: 15,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 3,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIcon: {
    backgroundColor: COLORS.secondaryColor,
  },
  messageIcon: {
    backgroundColor: '#29d637',
  },
  collapsedMessageView: {
    marginTop: 10,
  },
  collapsedMessageText: {
    borderWidth: 1,
    borderColor: "#d8d8d8",
    padding: 10,
    lineHeight: 25,
    borderBottomWidth: 0,
  },
  saveMessage: {
    backgroundColor: COLORS.secondaryColorShade,
    padding: 10,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  input: {
    marginTop: 5,
    minHeight: 50,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#dfe0e0',
    backgroundColor: '#f5f5f5',
    color: 'black',
    fontSize: 16,
    lineHeight: 25,
  },

})

export default MessageRequest;