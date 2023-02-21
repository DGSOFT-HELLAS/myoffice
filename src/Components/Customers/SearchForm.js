import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useState, useContext } from 'react'
import Text from '../Atoms/Text'
import Button from '../SharedComp/Buttons/Button'
import { COLORS } from '../../shared/COLORS'
import BoldText from '../Atoms/Text/BoldText'
import { fetchAPI } from '../../utils/fetchAPI'
import { UserContext } from '../../useContext/useContect'
import { useNavigation } from '@react-navigation/native'

const SearchForm = () => {
  const navigation = useNavigation()
  const [state, setState] = useState({
    name: '',
  })

  const onChangeName = (text) => setState((prev) => { return { ...prev, name: text } })
  const onChangePhone = (text) => setState((prev) => { return { ...prev, phone: text } })


  const onPress = () => {
    navigation.navigate('Πελάτες', { name: state.name })

  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <BoldText style={styles.label}>Όνομα:</BoldText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={state.name}
          />
        </View>

        <Button style={[styles.btn, styles.cancelDelete]} text={"Aναζήτηση"} onPress={onPress} />
      </View>



    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f6f5f6'
  },
  topView: {
    padding: 10,
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center'
  },
  inputView: {
    // padding: 10,
    marginTop: 15
  },
  input: {
    height: 50,
    backgroundColor: 'white'
  },
  btn: {
    backgroundColor: COLORS.secondaryColor,
    marginTop: 15,
  },
  inputText: {
    marginBottom: 5,
  }
});

export default SearchForm;