import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import Text from "../Atoms/Text"
import BoldText from "../Atoms/Text/BoldText"
import styles from "./styles"
import Entypo from "react-native-vector-icons/Entypo"
import FontAws from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native"
import Materiall from "react-native-vector-icons/MaterialIcons"
import Opticons from "react-native-vector-icons/Octicons"
import Ion from "react-native-vector-icons/Ionicons"

const HomeScreen = () => {

  const navigation = useNavigation()
  return (
    <ScrollView>
      <Section>
        <View style={styles.headerView}>
          <BoldText>Ραντεβού</BoldText>
        </View>
        <View style={styles.spacebetweenView}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <Entypo style={styles.icon} name="calendar" />
            </View>
            <Text style={styles.text}>Mήνας</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DayView')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <FontAws style={styles.icon} name="list-ul" />
            </View>
            <Text style={styles.text}>Μέρα Λίστα</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AppointmentsHistory')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <FontAws style={styles.icon} name="history" />
            </View>
            <Text style={styles.text}>Ιστορικό</Text>
          </TouchableOpacity>
        </View>
      </Section>
      <Section>
        <View style={styles.headerView}>
          <BoldText>Εισερχόμενα</BoldText>
        </View>
        <View style={styles.spacebetweenView}>
          <TouchableOpacity onPress={() => navigation.navigate('IncomingCallsForm')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <Materiall style={styles.icon} name="phone-callback" />
            </View>
            <Text style={styles.text}>Κλήσεις</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('IncomingEmailForm')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <FontAws style={styles.icon} name="envelope" />
            </View>
            <Text style={styles.text}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('IncomingEltaForm')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <Materiall style={styles.icon} name="markunread-mailbox" />
            </View>
            <Text style={styles.text}>Ελτά</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('IncomingTaskForm')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <Opticons style={styles.icon} name="report" />
            </View>
            <Text style={styles.text}>Αναφορά Εργασίας</Text>
          </TouchableOpacity>
        </View>
      </Section>
      <Section>
        <View style={styles.headerView}>
          <BoldText>Πελάτες</BoldText>
        </View>
        <View style={styles.spacebetweenView}>
          <TouchableOpacity onPress={() => navigation.navigate('CustomerSearchForm')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <Ion style={styles.icon} name="people" />
            </View>
            <Text style={styles.text}>Πελάτες</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Προσθήκη πελάτη')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <Ion style={styles.icon} name="person-add" />
            </View>
            <Text style={styles.text}>Προσθήκη Πελάτη</Text>
          </TouchableOpacity>
        </View>
      </Section>

    </ScrollView>

  )
}


const Section = ({ children }) => {
  return (
    <View style={styles.section}>
      {children}
    </View>
  )
}


export default HomeScreen;