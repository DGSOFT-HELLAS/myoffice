import { View, StyleSheet } from "react-native";
import Text from "../Text";


const NoDataView = () => {
  return (
    <View style={styles.view}>
      <Text>Δεν υπάρχουν δεδομένα</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

export default NoDataView;