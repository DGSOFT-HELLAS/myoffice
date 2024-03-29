import { View, StyleSheet } from 'react-native'
import { useState, } from 'react'
import Text from '../../Atoms/Text'
import Button from '../../SharedComp/Buttons/Button'
import { COLORS } from '../../../shared/COLORS'
import BoldText from '../../Atoms/Text/BoldText'
import { useNavigation } from '@react-navigation/native'
import { ModalDatePickerComp } from '../../DatePickers/ModalDatePicker'

const IncomingEltaForm = () => {
  const navigation = useNavigation()

  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date()
  })


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




  const onPress = () => {
    navigation.navigate('IncomingElta', { state: JSON.stringify(state) })
  }



  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <BoldText>Αναζήτηση Elta</BoldText>
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

        </View>
        <Button style={styles.btn} text={"Aναζήτηση"} onPress={onPress} />
      </View>



    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f6f5f6',

  },
  headerContainer: {

    marginBottom: 30,
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

export default IncomingEltaForm;