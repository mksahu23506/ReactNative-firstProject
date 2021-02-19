import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    global.isSignedIn?(
      // put the screens which are for after login
      <NavigationContainer>
      <Drawer.Navigator>
        {/* <Drawer.Screen name="Splash" component={SplashScreen} options={{ title: 'Splash screen' }} /> */}
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile page' }} />
        <Drawer.Screen name="Logout" component={LogoutScreen} options={{ title: 'Logout page' }} />
      </Drawer.Navigator>
    </NavigationContainer>
    )
    :
    (
      // put the screens which are for before login
      <NavigationContainer>
      <Drawer.Navigator>
        {/* <Drawer.Screen name="Splash" component={SplashScreen} options={{ title: 'Splash screen' }} /> */}
        <Drawer.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Drawer.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup Page' }} />
      </Drawer.Navigator>
    </NavigationContainer>
    )
  );
};

export default DrawerNavigation;
;