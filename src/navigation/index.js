
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IncomingStack } from "./stack";
import CustomDrawer from "./customDrawer";
import { COLORS } from "../shared/COLORS";
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();


const DrawerNav = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            width: '70%',
            backgroundColor: COLORS.sideBar,
            padding: 0,
            margin: 0,
          }
        }}

        drawerContent={(props) => <CustomDrawer {...props} />}
      >


        <Drawer.Screen
          name="Main"
          component={IncomingStack}
          options={{
            headerShown: false,
          }}
        />


      </Drawer.Navigator>
    </NavigationContainer>

  );
}

export default DrawerNav;