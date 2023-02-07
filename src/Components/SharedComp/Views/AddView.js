import { StyleSheet, View } from "react-native";

const AddView = ({ children }) => {
  return <View style={styles.addView}>{children}</View>
}


const styles = StyleSheet.create({
  addView: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 30,
  },
});

export default AddView;