//import default React and navigation:
import React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import NavStyle from './navStyle';

//Login Screen:
import Login from '../Components/Login/Login';
//Rantevou Screen:
import DayView from '../Components/Rantevou/DayView/DayVIew';
import AppointmentsHistory from '../Components/Rantevou/AppointmentsHistory/AppointmentsHistoryHeader';
import AddRantevou from '../Components/Rantevou/AddRantevou/AddRantevou';
import DayViewCalendarMain from '../Components/Rantevou/DayViewCalendarMain/DayViewCalendarMain';
import EditRantevou from '../Components/Rantevou/EditRantevou/EditRantevou';
import CalendarMonth from '../Components/Calendar/Calendar/Calendar';
import EventScreen from '../Components/Rantevou/EventScreen/EventScreen';
//------------------Import Screens:
//Sreen Incoming:
import IncomingCalls from '../Components/screenIncoming/IncomingCalls/IncomingCalls';
import IncomingEmails from '../Components/screenIncoming/IncomingEmails/Emails';
import IncomingElta from '../Components/screenIncoming/IncomingElta/Elta';
import IncomingTasks from '../Components/screenIncoming/IncomingTasks/IncomingTasks';
import IncomingCallsForm from '../Components/screenIncoming/IncomingCalls/Form';
import IncomingEmailForm from '../Components/screenIncoming/IncomingEmails/EmailForm';
import IncomingEltaForm from '../Components/screenIncoming/IncomingElta/EltaForm';
import IncomingTaskForm from '../Components/screenIncoming/IncomingTasks/TaskForm';
//Screen Customers:
import Customers from '../Components/Customers/customers';
import CustomerSearchForm from '../Components/Customers/SearchForm';
import AddCustomer from '../Components/Customers/AddCustomer';
import EditCustomer from '../Components/Customers/EditCustomer';

//Screen Calendar: 

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
          name="DayViewCalendarMain"
          component={DayViewCalendarMain}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={true} title={'Ραντεβού: Mέρα 3'} showDayModal={true} />
            ),
          }}
        />
        <Stack.Screen
          name="EventScreen"
          component={EventScreen}
          options={{
            headerShown: false
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
          name="IncomingCallsForm"
          component={IncomingCallsForm}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={false} title={'Κλήσεις'} />
            ),
          }}
        />
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
          name="IncomingEmailForm"
          component={IncomingEmailForm}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={false} title={'Email'} />
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
          name="IncomingEltaForm"
          component={IncomingEltaForm}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={false} title={'Ελτά'} />
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
          name="IncomingTaskForm"
          component={IncomingTaskForm}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={false} title={'Αναφορά εργασίας'} />
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
          name="CustomerSearchForm"
          component={CustomerSearchForm}
          options={{
            header: ({ navigation }) => (
              <NavStyle navigation={navigation} showback={false} title={'Πελάτες'} />
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









