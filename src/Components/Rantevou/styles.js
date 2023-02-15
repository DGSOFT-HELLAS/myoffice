import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({

  //LIST BODY STYLES:
  input: {
    margin: 10,
    width: '100%'
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',

  },
  dayView: {
    flexDirection: 'row',
    width: '100%',
    padding: 2,
  },
  dayRow: {
    marginVertical: 5,
  },
  leftCol: {
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    width: '100%',
    height: 0.4,
    backgroundColor: '#c9caca'
  },
  itemWrapper: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    elevation: 3,
    marginVertical: 5,
    borderTopWidth: 3,
  },
  accordionItem: {
    marginBottom: 10,
  },
  dayNum: {
    fontSize: 18,
    color: '#a6a9a8'
  },
  smallText: {
    fontSize: 11,
    color: '#aaacac'
  },

  itemActive: {
    borderTopWidth: 2,
    borderTopColor: 'green',
  },
  itemExpired: {
    borderTopWidth: 2,
    borderTopColor: 'red',
  },
  itemDescription: {
    marginTop: 3,
    fontFamily: 'Roboto-Regular'
  },
  lightSteelBlue: {
    borderTopColor: '#718FCE',
  },
  limeGreen: {
    borderTopColor: '#2ab61a',
  },
  silver: {
    borderTopColor: 'silver',
  },
  lightred: {
    borderTopColor: 'red',
  },
  pink: {
    borderTopColor: 'pink',
  },
  orange: {
    borderTopColor: 'orange',
  },
  ///new flatlist item
  flatItem: {
    backgroundColor: 'white'
  }

});