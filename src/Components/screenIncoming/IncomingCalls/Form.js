import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useState, useContext } from 'react'
import Text from '../../Atoms/Text'
import Button from '../../SharedComp/Buttons/Button'
import { COLORS } from '../../../shared/COLORS'
import BoldText from '../../Atoms/Text/BoldText'
import { useNavigation } from '@react-navigation/native'
import SearchInput from '../../SharedComp/Inputs/searchInput'
import { ModalDatePickerComp } from '../../DatePickers/ModalDatePicker'

const IncomingCallsForm = () => {
  const navigation = useNavigation()
  const [state, setState] = useState({
    name: '',
    phone: '',
    startDate: new Date(),
    endDate: new Date()
  })

  const onChangeName = (text) => setState((prev) => { return { ...prev, name: text } })
  const onChangePhone = (text) => setState((prev) => { return { ...prev, phone: text } })
  const onChangeStartDay = (selectedDate) => {
    setState((prevState) => {
      return {
        ...prevState, startDate: selectedDate
      }
    })
  };

  const onChangeEndDay = (selectedDate) => {
    setState((prevState) => {
      return {
        ...prevState, endDate: selectedDate
      }
    })
  };


  // const handleFetch = async () => {
  //   setState((prev) => {
  //     return {
  //       ...prev, loading: true
  //     }
  //   })
  //   const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/queryIncoming.php', { trdr: trdr, query: 'fetchCusomerData', postName: state.name })

  //   try {
  //     if (response) {
  //       console.log(response)
  //       setState((prev) => {
  //         return {
  //           ...prev, data: response
  //         }
  //       })
  //       setState((prev) => {
  //         return {
  //           ...prev, loading: false, refresh: false
  //         }
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const onPress = () => {
    navigation.navigate('IncomingCalls', { state: JSON.stringify(state) })
  }


  // const onPress = () => {
  //   // handleFetch();
  //   navigation.navigate('Πελάτες', { name: state.name })

  // }
  return (
    <>

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <BoldText style={styles.header}>Αναζήτηση Κλήσεων</BoldText>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.inputView}>
          <BoldText style={styles.label}>Ημερομηνία:</BoldText>
          <View style={styles.containerStyle}>
            <View style={{ width: '50%' }}>
              <Text>Από:</Text>
              <ModalDatePickerComp style={styles.modalContainer} day={state.startDate} onChange={onChangeStartDay} />
            </View>
            <View style={{ width: '50%' }}>
              <Text>Έως:</Text>
              <ModalDatePickerComp style={styles.modalContainer} day={state.endDate} onChange={onChangeEndDay} />
            </View>
          </View>
          {/* <ChooseDates day={state.startDate} endDay={state.endDate} onChangeStartDay={onChangeStartDay} onChangeEndDay={onChangeEndDay} containerStyle={styles.containerStyle} /> */}
        </View>
        <SearchInput title="Όνομα:" onChangeText={onChangeName} value={state.name} />
        <SearchInput title="Tηλέφωνο:" onChangeText={onChangePhone} value={state.phone} />


        <Button style={[styles.btn, styles.cancelDelete]} text={"Aναζήτηση"} onPress={onPress} />
      </View>



    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f6f5f6',

  },
  headerContainer: {

    marginBottom: 30,
  },
  header: {

  },
  divider: {
    width: 20,
    height: 3,
    backgroundColor: COLORS.secondaryColor,
    marginTop: 5,
    borderRadius: 20,
  },

  containerStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 1,
    borderRadius: 3,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: COLORS.secondaryColorShade002
  },
  topView: {
    padding: 10,
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center'
  },
  inputView: {
    marginTop: 15
  },
  input: {
    height: 50,
    backgroundColor: 'white'
  },
  btn: {
    backgroundColor: COLORS.secondaryColor,
    marginTop: 15,
    height: 60,
    borderRadius: 3,
  },
  inputText: {
    marginBottom: 5,
  },
  label: {
    marginBottom: 5,
  },
  modalContainer: {
    borderWidth: 1,
    borderColor: COLORS.secondaryColorShade002,
    marginTop: 5,
  },
});

export default IncomingCallsForm;