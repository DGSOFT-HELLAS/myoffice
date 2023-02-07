import { ActivityIndicator, View, StyleSheet} from "react-native";

const Spinner = (props) => {
  return (
    <View style={[styles.view, props.style]}>
      <ActivityIndicator size="large" />
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Spinner;