// $result = mssql_query($query);
import React, { useContext } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import ShowPass from './ShowPassword';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../../useContext/useContect';
import { COLORS } from '../../../shared/COLORS';

export const LoginInputUser = ({ handleUser }) => {
  const { username } = useContext(UserContext);

  return (
    <>
      <View style={styles.inputWrapper}>
        <Icon name="account" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={username}
          placeholder={'USERNAME'}
          placeholderTextColor={'#969696'}
          onChangeText={handleUser}></TextInput>
      </View>
    </>
  );
};


export const LoginInputPass = ({
  handlePass,
  handleShowText,
  showPass
}) => {
  const { password } = useContext(UserContext);
  return (
    <>
      <View style={styles.inputWrapper}>
        <Icon name="lock" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={'PASSWORD'}
          placeholderTextColor={'#969696'}
          secureTextEntry={showPass}
          onChangeText={handlePass}></TextInput>
        <ShowPass bool={showPass} action={handleShowText} />
      </View>
    </>
  );
};

//Generic Input
export const Input = ({ placeholder, text, handleType }) => {
  return (
    <>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholderTextColor="#969696"
          style={styles.input}
          defaultValue={text}
          placeholder={placeholder}
          onChangeText={handleType}></TextInput>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    // backgroundColor: COLORS.thinGrey,
  },
  input: {
    height: 60,
    padding: 10,
    fontSize: 16,
    flex: 1,
    letterSpacing: 0.8,
  },
  icon: {
    fontSize: 18,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    // backgroundColor: COLORS.secondaryColor,
    backgroundColor: COLORS.primaryColor,
    padding: 5,
    borderRadius: 50,
  },
});