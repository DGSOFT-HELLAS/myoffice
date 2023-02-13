import { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { LoginInputPass, LoginInputUser } from "./LoginInput/LoginInput";
import CheckBox from "./LoginButtons/LoginCheckBox";
import { UserContext } from "../../useContext/useContect";
import { fetchUser } from "../../utils/fetchUser";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../SharedComp/Buttons/Button";
import BoldText from "../Atoms/Text/BoldText";
import Text from "../Atoms/Text";
import { COLORS } from "../../shared/COLORS";

const Login = () => {
  const {
    username, setUsername,
    password, setPassword,
    trdr, setTrdr,
    setIsLoggedIn
  } = useContext(UserContext);

  const navigation = useNavigation()
  const [showPass, setShowPass] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowText = () => setShowPass(previousState => !previousState);
  const handlePass = text => {
    setPassword(text)
  };
  const handleUser = text => {
    setUsername(text)
  };

  const handleIsLogged = async () => {
    await AsyncStorage.setItem('@isLogged', JSON.stringify(true));

  }


  const onPressActions = async () => {
    setLoading(true)
    const response = await fetchUser('https://portal.myoffice.com.gr/mobApi/loginMob.php', { username: username, password: password });
    if (response.length > 0) {
      if (isChecked) {
        setIsLoggedIn(true);
        handleIsLogged()

      }
      setTrdr(response[0]['trdr']);
      setLoading(false)
      // navigation.navigate('Ραντεβού: Εβδομάδα')
      navigation.navigate('DayViewCalendarMain')

    }
    if (response.length == 0) {
      Alert.alert('Λάθος στοιχεία χρήστη', 'Παρακαλώ δοκιμάστε ξανά')
    }


  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textView}>
        <BoldText style={{ fontSize: 30, color: COLORS.primaryColor }}>MyOffice Services</BoldText>
        <Text style={{ fontSize: 18, color: COLORS.secondaryColor }}>WE SIMPLIFY YOUR WORK LIFE</Text>
      </View>
      <LoginInputUser
        handleUser={handleUser} />
      <LoginInputPass
        handlePass={handlePass}
        handleShowText={handleShowText}
        showPass={showPass}
      />
      <CheckBox
        isChecked={isChecked}
        setIsChecked={setIsChecked}></CheckBox>
      <Button
        style={styles.loginBtn}
        loading={loading}
        onPress={onPressActions}
        text={'Login'}
        message="message"></Button>

    </ScrollView>
  );
};



const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%'
  },
  textView: {
    alignItems: 'center',
    marginBottom: 50
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 50,
  },
  loginBtn: {
    width: '100%',
    // backgroundColor: COLORS.secondaryColor,,
    backgroundColor: COLORS.primaryColor,
    height: 60,
  }
});

export default Login