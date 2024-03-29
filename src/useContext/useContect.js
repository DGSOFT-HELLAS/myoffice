import React, { useState, createContext } from "react";
import { StyleSheet } from "react-native";


export const UserContext = createContext()






export const Layout = ({ children }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trdr, setTrdr] = useState();


  return (
    <UserContext.Provider style={styles.container} value={{ password, setPassword, username, setUsername, trdr, setTrdr, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});