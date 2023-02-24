import { StyleSheet } from "react-native"
import { COLORS } from "../../shared/COLORS";
const styles = StyleSheet.create({
  section: {
    borderRadius: 4,
    padding: 10,
  },
  headerView: {
    // backgroundColor: 'white',
    padding: 10,
  },
  spacebetweenView: {
    marginTop: 3,
    minHeight: 100,
  },
  tabView: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 4,
    marginBottom: 2,
    paddingLeft: 10,
    paddingVertical: 8,
    borderRadius: 3,
  },
  iconContainer: {
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 35,
    height: 35,
    borderWidth: 2,
    borderColor: COLORS.secondaryColorShade002
  },
  icon: {
    color: 'white',
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    marginLeft: 5,
  }
});

export default styles