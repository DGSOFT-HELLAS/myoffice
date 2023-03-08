import { useState, useContext } from "react";
import BoldText from "../Atoms/Text/BoldText";
import { View, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { LoginInputUser, LoginInputPass } from "./LoginInput/LoginInput";
import { UserContext } from "../../useContext/useContect";
import Button from "../SharedComp/Buttons/Button";
import Text from "../Atoms/Text";
import { fetchAPI } from "../../utils/fetchAPI";
import { useNavigation } from "@react-navigation/native";

const ShowPass = () => {
  const navigation = useNavigation()
  const {
    username,
    password
  } = useContext(UserContext);

  const [newData, setNewData] = useState({
    username: username,
    password: password,
    newPassword: '',
    confirm: ''
  })


  console.log(newData)


  const handleUser = text => {
    setNewData(prev => {
      return {
        ...prev, username: text
      }
    })
  };
  const handlePass = text => {
    setNewData(prev => {
      return {
        ...prev, password: text
      }
    })
  };
  const handleNewPass = text => {
    setNewData(prev => {
      return {
        ...prev, newPassword: text
      }
    })
  };
  const handleConfirm = text => {
    setNewData(prev => {
      return {
        ...prev, confirm: text
      }
    })
  };



  const onPressActions = async () => {
    const response = await fetchAPI('https://portal.myoffice.com.gr/mobApi/changePass.php', { username: newData.username, password: newData.password, newPassword: newData.newPassword, confirm: newData.confirm });
    console.log(response)

    if (response.errorMessage == "") {
      navigation.navigate('Login');
    } else {
      Alert.alert(`${response.errorMessage}`)
    }
  }

  return (
    <>
      <View style={styles.header}>
        <BoldText>Show Pass</BoldText>
      </View>
      <ScrollView style={{ padding: 10 }}>
        <BoldText style={styles.text}>Usenrame:</BoldText>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newData.username}
            placeholderTextColor={'#969696'}
            onChangeText={handleUser}></TextInput>
        </View>
        <BoldText style={styles.text}>Password:</BoldText>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newData.password}
            placeholderTextColor={'#969696'}
            onChangeText={handlePass}></TextInput>
        </View>
        <BoldText style={styles.text}>New Password:</BoldText>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newData.newPassword}
            placeholderTextColor={'#969696'}
            onChangeText={handleNewPass}></TextInput>
        </View>
        <BoldText style={styles.text}>Confirm New Password:</BoldText>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newData.confirm}
            placeholderTextColor={'#969696'}
            onChangeText={handleConfirm}></TextInput>
        </View>
        <Button
          // style={styles.loginBtn}
          onPress={onPressActions}
          text={'Submit'}
        ></Button>
        <View style={styles.textView}>
          <Text style={styles.bottomText}>*Ο κωδικός πρέπει να έχει τις παρακάτω συνθήκες :</Text>
          <Text style={styles.bottomText}>O κωδικός πρόσβασης πρέπει να αποτελείται από 8 χαρακτήρες τουλάχιστον , να περιέχει ένα κεφαλαίο χαρακτήρα τουλάχιστον,να περιέχει ένα πεζό χαρακτήρα τουλάχιστον, να περιέχει έναν αριθμό τουλάχιστον, να περιέχει έναν ειδικό χαρακτήρα τουλάχιστον και ο νέος κωδικός δεν μπορεί να είναι ίδιος με τον προηγούμενο:</Text>
        </View>
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  container: {

  },
  inputWrapper: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    // borderColor: COLORS.secondaryColorShade002,
    // borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 5,
    // backgroundColor: COLORS.thinGrey,
  },
  header: {
    padding: 10,
    backgroundColor: '#dfdedf',
    minHeight: 60,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    padding: 10,
    fontSize: 16,
    flex: 1,
    letterSpacing: 0.8,
  },
  text: {
    color: '#9b9a9c'
  },
  textView: {
    padding: 5,
    marginTop: 10,
  },
  bottomText: {
    lineHeight: 23,
  }
});
export default ShowPass;