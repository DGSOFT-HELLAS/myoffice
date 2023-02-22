import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useState, useContext } from 'react'
import Text from '../Atoms/Text'
import Button from '../SharedComp/Buttons/Button'
import { COLORS } from '../../shared/COLORS'
import BoldText from '../Atoms/Text/BoldText'
import SearchInput from '../SharedComp/Inputs/searchInput'
import { useNavigation } from '@react-navigation/native'

const SearchForm = () => {
  const navigation = useNavigation()
  const [state, setState] = useState({
    postName: '',
    postNumber: '',
  })

  const onChangeName = (text) => setState((prev) => { return { ...prev, postName: text } })
  const onChangePhone = (text) => setState((prev) => { return { ...prev, postNumber: text } })


  const onPress = () => {
    navigation.navigate('Πελάτες', { postName: state.postName, postNumber: state.postNumber })

  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <BoldText style={styles.header}>Αναζήτηση Πελατών</BoldText>
          <View style={styles.divider}></View>
        </View>
        <SearchInput title="Όνομα:" onChangeText={onChangeName} value={state.postName} />
        <SearchInput title="Tηλέφωνο:" onChangeText={onChangePhone} value={state.postNumber} />
        <Button style={styles.btn} text={"Aναζήτηση"} onPress={onPress} />
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f6f5f6'
  },
  btn: {
    backgroundColor: COLORS.secondaryColor,
    marginTop: 15,
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

});

export default SearchForm;