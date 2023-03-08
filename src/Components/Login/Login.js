import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
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





  const onPressActions = async () => {
    setLoading(true)
    const response = await fetchUser('https://portal.myoffice.com.gr/mobApi/loginMob.php', { username: username, password: password });
    if (response.length > 0) {
      if (isChecked) {
        await AsyncStorage.setItem('@username', username);
        await AsyncStorage.setItem('@password', password);
      }
      setTrdr(response[0]['trdr']);
      navigation.navigate('Home', { show: true })

    }

    if (response.length == 0) {
      Alert.alert('Λάθος στοιχεία χρήστη', 'Παρακαλώ δοκιμάστε ξανά')
    }
    setLoading(false)

  }

  //Checkbox press, to save password
  const onPressCheckbox = async () => {
    setIsChecked(true)

    await AsyncStorage.setItem('@checkbox', JSON.stringify(true));

  }

  const clearLogin = async () => {
    await AsyncStorage.setItem('@checkbox', JSON.stringify(false));
    await AsyncStorage.setItem('@password', '');
    await AsyncStorage.setItem('@username', '');
    setIsChecked(false)
    setPassword('')
    setUsername('')
  }
  const getAsync = async () => {
    let item = await AsyncStorage.getItem('@checkbox');
    if (item === 'true') {
      setIsChecked(true)
    }
    if (item === 'false') {
      setIsChecked(false)
    }

    let password = await AsyncStorage.getItem('@password');
    let username = await AsyncStorage.getItem('@username');
    if (password && username) {
      setPassword(password)
      setUsername(username)
    }
  }

  useEffect(() => {

    getAsync()
  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textView}>
          <Image
            style={{ width: 250, height: 50 }}
            source={require('../../assets/imgs/logo.png')}
          />
          {/* <BoldText style={{ fontSize: 30, color: COLORS.primaryColor }}>MyOffice Services</BoldText>
          <Text style={{ fontSize: 18, color: COLORS.secondaryColor }}>WE SIMPLIFY YOUR WORK LIFE</Text> */}
        </View>
        <LoginInputUser
          handleUser={handleUser} />
        <LoginInputPass
          handlePass={handlePass}
          handleShowText={handleShowText}
          showPass={showPass}
        />
        <CheckBox
          onPress={onPressCheckbox}
          isChecked={isChecked}
          setIsChecked={setIsChecked}></CheckBox>
        <Button
          style={styles.loginBtn}
          loading={loading}
          onPress={onPressActions}
          text={'Login'}
          message="message"></Button>
        <Button
          style={styles.changePassBtn}
          onPress={() => navigation.navigate('ShowPass')}
          text={'Change Password'}
        ></Button>
        {isChecked && <Button
          textStyle={styles.clearLoginText}
          style={styles.clearLogin}
          // onPress={onPressActions}
          onPress={clearLogin}
          text={'Clear Login'}></Button>}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    alignItems: 'center',
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
  },
  changePassBtn: {
    width: '100%',
    backgroundColor: 'red',
    height: 60,
    marginTop: 20,
  },
  clearLogin: {
    backgroundColor: 'white',
    elevation: 0,
    marginTop: 5,
    width: '100%',
  },
  clearLoginText: {
    color: 'black',
    textDecorationLine: 'underline'
  }
});

export default Login