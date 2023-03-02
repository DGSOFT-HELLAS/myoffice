import React, { useEffect, useState, useRef, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, BackHandler, ScrollView } from "react-native";
import { COLORS } from "../shared/COLORS";
import BoldText from "../Components/Atoms/Text/BoldText";
import Text from "../Components/Atoms/Text";
import { useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView } from '@react-navigation/drawer';
// IMPORT ICONS:
import Entypo from 'react-native-vector-icons/Entypo'
import Material from 'react-native-vector-icons/MaterialIcons'
import Ion from 'react-native-vector-icons/Ionicons'



const CustomDrawer = (props) => {
  const [id, setId] = useState({})


  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}  >
      <View style={styles.headerView}>
        <BoldText style={{ fontSize: 28, color: COLORS.contrastText }}>MyOffice Services</BoldText>
        <Text style={{ fontSize: 17, color: COLORS.secondaryColor }}>WE SIMPLIFY YOUR WORK LIFE</Text>
      </View>
      <View style={{ flex: 1, zIndex: 20 }}>

        <View style={styles.tabContainer}>
          <DrawerItem title="Αρχική" Icon={Entypo} iconName="home" index={4} id={id} setId={setId} homePage={true} />

        </View>
        <View style={styles.tabContainer}>
          <DrawerItem title="Ραντεβού" Icon={Entypo} iconName="calendar" index={1} id={id} setId={setId} />
          {id == 1 && (
            <DrawerSubItemView >
              <DrawerSubItem title="Μήνας" screen="Calendar" setId={setId} show={true} />
              <DrawerSubItem title="Μέρα Λίστα" parent="Ραντεβού" screen="DayView" setId={setId} />
              <DrawerSubItem title="Ιστορικό" screen="AppointmentsHistory" setId={setId} />
            </DrawerSubItemView>
          )}
        </View>
        <View style={styles.tabContainer}>
          <DrawerItem title="Εισερχόμενα" Icon={Material} iconName="call-received" index={2} id={id} setId={setId} />
          {id == 2 && (
            <DrawerSubItemView>
              <DrawerSubItem title="Κλήσεις" screen="IncomingCallsForm" setId={setId} />
              <DrawerSubItem title="Email" screen="IncomingEmailForm" setId={setId} />
              <DrawerSubItem title="Εlta" screen="IncomingEltaForm" setId={setId} />
              <DrawerSubItem title="Αναφορά Εργασίας" screen="IncomingTaskForm" setId={setId} />
            </DrawerSubItemView>
          )}
        </View>
        <View style={styles.tabContainer}>
          <DrawerItem title="Πελάτες" Icon={Ion} iconName="person" index={3} id={id} setId={setId} />
          {id == 3 && (
            <DrawerSubItemView>
              <DrawerSubItem title="Πελάτες" screen="CustomerSearchForm" setId={setId} />
              <DrawerSubItem title="Προσθήκη Πελάτη" screen="Προσθήκη πελάτη" setId={setId} />
            </DrawerSubItemView>
          )}
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
        <TouchableOpacity style={styles.exitBtn} onPress={() => BackHandler.exitApp()}>
          <Ion name="exit-outline" color="white" size={18} />
          <Text style={{ color: 'white', marginLeft: 5 }}>Exit</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView >
  )
}




const DrawerItem = ({ title, Icon, iconName, index, setId, id, homePage }) => {
  const navigation = useNavigation()
  const handleCollapse = () => {
    if (index == id) {
      setId({})
    } else {
      setId(index)
    }

  }

  const goToHome = () => {
    navigation.navigate('Home')
  }

  return (
    <TouchableOpacity style={styles.sidebarItem} onPress={homePage ? goToHome : handleCollapse} >
      <View style={styles.iconView}>
        <Icon style={styles.subIcon} name={iconName} size={13} color="white" />
      </View>
      <Text style={styles.itemText} >{title}</Text>
    </TouchableOpacity>
  )
}

const DrawerSubItemView = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (

    <Animated.View
      style={[{ opacity: fadeAnim }, styles.subItemView]}>
      {children}
    </Animated.View>
  )
}


const DrawerSubItem = ({ screen, title, setId, date, show, dateBool }) => {
  const navigation = useNavigation()
  // const { setDay } = useContext(DayContext)
  const onPress = () => {

    setId({})
    navigation.navigate(screen, { date: date, show: show })

  }
  return (
    <TouchableOpacity style={styles.subItem} onPress={onPress} >
      <View style={styles.subItemLeftView}></View>
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  tabContainer: {
    marginBottom: 2,
  },
  headerView: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    // backgroundColor: COLORS.sideBarItem
  },
  headerText: {
    color: COLORS.contrastText,
    fontSize: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.sideBarItem,
    height: 60,
    alignItems: 'center',
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondaryColor
  },
  iconView: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.sideBarIconView,
    marginRight: 5,
  },
  icon: {
    color: '#0058c2'
  },
  itemText: {
    marginLeft: 8,
    color: COLORS.contrastText
  },

  subItem: {
    backgroundColor: COLORS.sideBarsubItem,
    minHeight: 40,
    marginTop: 2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subItemLeftView: {
    width: 6,
    borderRadius: 50,
    height: 6,
    backgroundColor: COLORS.secondaryColorShade002,
  },
  subIconView: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.sideBarIconView,
    marginRight: 5,
  },
  subIcon: {
    color: COLORS.secondaryColorShade001
  },
  exitBtn: {
    backgroundColor: COLORS.sideBarsubItem,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});


export default CustomDrawer;