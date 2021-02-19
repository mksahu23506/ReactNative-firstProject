import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Stack = createStackNavigator();

const InternalNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Splash" component={SplashScreen} options={{ title: 'Splash screen' }} params={'someData'}/> */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup Page' }} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile page' }} />
        <Stack.Screen name="Logout" component={LogoutScreen} options={{ title: 'Logout page' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InternalNavigation;