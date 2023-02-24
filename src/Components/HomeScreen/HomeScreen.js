import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import Text from "../Atoms/Text"
import BoldText from "../Atoms/Text/BoldText"
import styles from "./styles"
import Entypo from "react-native-vector-icons/Entypo"
import FontAws from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native"
const HomeScreen = () => {

  const navigation = useNavigation()
  return (
    <ScrollView>
      <Section>
        <View style={styles.headerView}>
          <BoldText>Εισερχόμενα</BoldText>
        </View>
        <View style={styles.spacebetweenView}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <Entypo style={styles.icon} name="calendar" />
            </View>
            <Text style={styles.text}>Mήνας</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <FontAws style={styles.icon} name="list-ul" />
            </View>
            <Text style={styles.text}>Μέρα Λίστα</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.tabView}>
            <View style={styles.iconContainer}>
              <FontAws style={styles.icon} name="history" />
            </View>
            <Text style={styles.text}>Ιστορικό</Text>
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