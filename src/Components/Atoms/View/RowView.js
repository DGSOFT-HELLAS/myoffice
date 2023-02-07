import { View, StyleSheet } from "react-native";

const RowView = (props) => {
  return (
    <View style={[styles.view, props.style]}>
      {props.children}
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default RowView;