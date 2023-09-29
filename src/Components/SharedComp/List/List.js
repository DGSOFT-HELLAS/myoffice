import { View, StyleSheet, TextInput, Linking, TouchableOpacity } from "react-native"
import BoldText from "../Text/BoldText"
import Text from "../Text/RegularText"
import { COLORS } from '../../../shared/COLORS'
import Button from "../../Atoms/Button"



//List accordion Header Items
export const ListTitle = ({ data, value, Icon, iconName }) => {
  return (
    <View style={styles.titleContainer}>
      {/* <Enty style={styles.icon} name="calendar" /> */}
      <Icon name={iconName} style={styles.icon} />
      {/* <BoldText style={styles.titleTime}>  {getTime(data.start)} - {getTime(data.end)}</BoldText> */}
      {/* {route.name === 'AppointmentsHistory' &&  <BoldText style={styles.titleTime}>  {data && data["Ημ/νία"]}</BoldText> } */}

      <BoldText style={styles.titleValue}>{value}</BoldText>

    </View>
  )
}

export const DescriptionTitle = ({ value }) => {

  return (
    <View style={styles.description}>
      {/* <Text>{data.title.split(':')[0]}</Text> */}
      <Text>{value}</Text>
    </View>
  )
}

//List accordion Body Items:

export const ListBodyView = ({ children }) => {
  return (
    <View style={styles.listView}>
      {children}
    </View>
  )
}

export const ActiveExpiredWrapper = ({ children, data }) => {
  return (
    <View style={styles.itemWrapper} >
      {children}
    </View>
  )
}

export const ListBodyDataSet = ({ title, value, enabled, onChangeText, multiline }) => {
  return (
    <View style={styles.listBodyDataSetView}>
      <BoldText style={styles.title}>{title}</BoldText>
        <TextInput style={[styles.input, enabled && styles.inputEnabled]} editable={enabled} multiline={multiline} onChangeText={onChangeText} value={value} /> 
           {/* <TextInput style={styles.textinput} value={value} editable={enabled} multiline={multi}  onChangeText={onChangeText}/> */}
    </View>
  )
}
export const ListBodyMobile = ({ title, value, enabled, onChangeText }) => {
  return (
    <View style={styles.listBodyDataSetView}>
      <BoldText style={styles.title}>{title}</BoldText>
      <TouchableOpacity onPress={() => value && Linking.openURL(`tel:${value}`)}>
        <TextInput style={[styles.inputMobile, enabled && styles.inputEnabled]} editable={enabled} onChangeText={onChangeText} value={value} />
       
      </TouchableOpacity>

    </View>
  )
}



export const ListBodyButton = ({ onPress, enabled }) => {
  return (
    <Button onPress={onPress} textStyle={styles.textStyle} style={[styles.button]}>{'Edit'}</Button>
  )
}




const styles = StyleSheet.create({
  //LIST ACCORDION ---- HEADER ---- STYLES:
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  icon: {
    marginRight: 4,
    fontSize: 15,
    color: COLORS.secondaryColor
  },
  titleValue: {
    fontSize: 14,
    color: 'black',
  },
  description: {
    marginTop: 10,
    fontSize: 11
  },
  //LIST ACCORDION ---- BODY ---- STYLES:

  timeView: {
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  listView: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: 17,
    marginVertical: 5,
  },
  input: {
    minHeight: 45,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#dfe0e0',
    // backgroundColor: '#f5f5f5',
    color: '#b0acaf',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputMobile: {
    minHeight: 50,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#dfe0e0',
    backgroundColor: '#f5f5f5',
    color: COLORS.secondaryColor,
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  inputEnabled: {
    color: 'black'
  },

  button: {
    backgroundColor: COLORS.secondaryColorShade001,
    marginTop: 10,
    width: 100,
    height: 40,
  },
  textinput: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#dfe0e0',
      backgroundColor: '#f5f5f5',
  },


  listBodyDataSetView: {
    marginBottom: 10,
  }

})