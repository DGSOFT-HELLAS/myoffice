import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../../Atoms/Text';
import FontAws from 'react-native-vector-icons/FontAwesome5'
import { COLORS } from '../../../shared/COLORS';


const CheckBox = ({ isChecked, setIsChecked, onPressCheckbox }) => {

  const onPress = () => {
    onPressCheckbox()
    setIsChecked(true)
  }

  return (
    <>
      <TouchableOpacity style={styles.containerCheck} onPress={onPress} >
        <View style={styles.checkBox}>
          <Text>
            <FontAws
              style={isChecked ? styles.checkIcon : styles.unCheckedIcon}
              name="check"
            />
          </Text>
        </View>
        <Text >
          Αποθήκευση Χρήστη
        </Text>
      </TouchableOpacity>

    </>
  );
};

//   const { username, password } = useContext(UserContext);
//   const handleCheck = async () => {
//     /* On clicking the button we will change the state. Before setting setIsChecked-> i change the value manually, and store it in a variable, then i alter the state*/
//     try {
//       let value = JSON.stringify(!isChecked);
//       await AsyncStorage.setItem('@checkBtn', value);
//     } catch (e) {
//       console.log(e);
//     }
//     setIsChecked(true);
//   };

//   const getData = async () => {
//     const val = await AsyncStorage.getItem('@checkBtn');
//     const value = await JSON.parse(val);
//     console.log('valueGetData ' + value);
//     //On first login there is no value stored, so we set it to false. after the login we have a new value saved and we later retreive it and store it in the variable 'value'
//     if (value !== null) {
//       setIsChecked(value);
//     } else {
//       setIsChecked(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <>
//       {username && password ? (
//         <TouchableOpacity onPress={handleCheck} style={styles.containerCheck}>
//           <View style={styles.checkBox}>
//             <Text>
//               <FontAws
//                 style={isChecked ? styles.checkIcon : styles.unCheckedIcon}
//                 name="check"
//               />
//             </Text>
//           </View>
//           <Text style={isChecked ? styles.textSave : styles.text}>
//             {isChecked ? 'User data saved' : 'Store User Data'}
//           </Text>
//         </TouchableOpacity>
//       ) : null}
//     </>
//   );
// };

const styles = StyleSheet.create({
  containerCheck: {
    flexDirection: 'row',
    // alignItems: 'center',
    color: 'white',
    marginBottom: 20,
    alignItems: 'center',
    width: '100%'
  },
  checkBox: {
    borderColor: COLORS.borderColor,
    borderWidth: 1.5,
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,

  },

  checkIcon: {
    color: COLORS.primaryColor
  },
  unCheckedIcon: {
    color: 'white',
  },
  text: {
    // color: COLORS.lightGrey
    marginLeft: 5,
  },

});

export default CheckBox;