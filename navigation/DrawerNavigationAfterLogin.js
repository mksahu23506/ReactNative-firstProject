import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import Enterprise from '../screens/Enterprise';
import AddEnterprise from '../screens/AddEnterprise';
import Contest from '../screens/Contest';
import AddContest from '../screens/AddContest';
import ProfileScreen from '../screens/ProfileScreen';
import Dashboard from '../screens/Dashboard';

const Drawer = createDrawerNavigator();

const DrawerNavigationAfterLogin = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* <Drawer.Screen name="Splash" component={SplashScreen} options={{ title: 'Splash screen' }} /> */}
        {/* <Drawer.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} /> */}
        {/* <Drawer.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup Page' }} /> */}
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
        <Drawer.Screen name="Enterprise" component={Enterprise} options={{ title: 'Enterprise' }} />
        <Drawer.Screen name="AddEnterprise" component={AddEnterprise} options={{ title: 'Add Enterprise' }} />
        <Drawer.Screen name="Contest" component={Contest} options={{ title: 'Contest' }} />
        <Drawer.Screen name="AddContest" component={AddContest} options={{ title: 'Add Contest' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        {/* <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} /> */}
        {/* <Drawer.Screen name="Logout" component={LogoutScreen} options={{ title: 'Logout' }} onPress={()=> alert('welcome')}/> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigationAfterLogin;
;