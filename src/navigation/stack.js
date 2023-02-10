//import default React and navigation:
import React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import WeekViewCalendar from '../Components/Rantevou/WeekView/WeekCalendar';
import DayView from '../Components/Rantevou/DayView/DayVIew';
import AppointmentsHistory from '../Components/Rantevou/AppointmentsHistory/AppointmentsHistoryHeader';
import AddRantevou from '../Components/Rantevou/AddRantevou/AddRantevou';
import Login from '../Components/Login/Login';
import NavStyle from './navStyle';
import DayViewCalendarMain from '../Components/Rantevou/DayViewCalendarMain/DayViewCalendarMain';
//------------------Import Screens:
//Sreen Incoming:
import IncomingCalls from '../Components/screenIncoming/IncomingCalls/IncomingCalls';
import IncomingEmails from '../Components/screenIncoming/IncomingEmails/Emails';
import IncomingElta from '../Components/screenIncoming/IncomingElta/Elta';
import IncomingTasks from '../Components/screenIncoming/IncomingTasks/IncomingTasks';
//Screen Customers:
import Customers from '../Components/Customers/customers';

import AddCustomer from '../Components/Customers/AddCustomer';
import EditCustomer from '../Components/Customers/EditCustomer';
import EditRantevou from '../Components/Rantevou/EditRantevou/EditRantevou';
//Screen Calendar: 
import CalendarMonth from '../Components/Calendar/Calendar/Calendar';
const Stack = createNativeStackNavigator();





export const IncomingStack = () => {
  return (

    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Ραντεβού: Εβδομάδα"
          component={WeekViewCalendar}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={false} title={'Ραντεβού: Εβδομάδα'} showDayModal={true} />
            ),
          }}
        />
        <Stack.Screen
          name="DayView"
          component={DayView}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Ραντεβού: Ημέρα'} showDayModal={true} l />
            ),
          }}
        />
        <Stack.Screen
          name="AppointmentsHistory"
          component={AppointmentsHistory}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Ραντεβού: Iστορικό'} showDayModal={true} />
            ),
          }}
        />

        <Stack.Screen
          name="DayViewCalendarMain"
          component={DayViewCalendarMain}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Ραντεβού: Mέρα 3'} showDayModal={true} />
            ),
          }}
        />
        <Stack.Screen
          name="AddRantevou"
          component={AddRantevou}
          options={{

            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Προσθήκη Ραντεβού'} showDayModal={true} dontShowAdd={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Διόρθωση ραντεβού"
          component={EditRantevou}
          options={{

            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Διόρθωση ραντεβού'} />
            ),
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarMonth}
          options={{

            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Μήνας'} />
            ),
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="IncomingCalls"
          component={IncomingCalls}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Κλήσεις'} />
            ),
          }}
        />

        <Stack.Screen
          name="IncomingEmails"
          component={IncomingEmails}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Email'} />
            ),
          }}
        />
        <Stack.Screen
          name="IncomingElta"
          component={IncomingElta}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Ελτά'} />
            ),
          }}
        />
        <Stack.Screen
          name="IncomingTasks"
          component={IncomingTasks}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Αναφορά εργασίας'} />
            ),
          }}
        />
        <Stack.Screen
          name="Πελάτες"
          component={Customers}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Πελάτες'} />
            ),
          }}
        />
        <Stack.Screen
          name="Προσθήκη πελάτη"
          component={AddCustomer}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Προσθήκη Πελάτη'} />
            ),
          }}
        />
        <Stack.Screen
          name="Διόρθωση πελάτη"
          component={EditCustomer}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Διόρθωση πελάτη'} />
            ),
          }}
        />
      </Stack.Group>


    </Stack.Navigator>
  );
}



// export const IncomingStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="Ραντεβού"
//         component={Stack1}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="Eισερχόμενα"
//         component={Stack2}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// }



// export const Stack1 = () => {
//   return (
//     <Stack.Navigator>

//       <Stack.Screen
//         name="Main"
//         component={WeekViewCalendar}
//         options={{
//           header: ({ navigation }) => (
//             <NavStyle navigation={navigation} showback={true} />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="DayView"
//         component={DayView}
//         options={{
//           header: ({ navigation }) => (
//             <NavStyle navigation={navigation} showback={true} />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="AppointmentsHistory"
//         component={AppointmentsHistory}
//         options={{
//           header: ({ navigation }) => (
//             <NavStyle navigation={navigation} showback={true} />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="AddRantevou"
//         component={AddRantevou}
//         options={{
//           header: ({ navigation }) => (
//             <NavStyle navigation={navigation} showback={true} />
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   )

// }
// export const Stack2 = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="IncomingCalls"
//         component={IncomingCalls}
//         options={{
//           header: ({ navigation }) => (
//             <NavStyle navigation={navigation} showback={true} />
//           ),
//         }}
//       />

//       <Stack.Screen
//         name="IncomingEmails"
//         component={IncomingEmails}
//         options={{
//           header: ({ navigation }) => (
//             <NavStyle navigation={navigation} showback={true} />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="IncomingElta"
//         component={IncomingElta}
//         options={{
//           header: ({ navigation }) => (
//             <NavStyle navigation={navigation} showback={true} />
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   )

// }









