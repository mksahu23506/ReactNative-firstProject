import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginOtpScreen from '../screens/LoginOtpScreen';
import OtpScreen from '../screens/OtpScreen';

const Stack = createStackNavigator();

const InternalNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Splash" component={SplashScreen} options={{ title: 'Splash screen' }} params={'someData'}/> */}
        <Stack.Screen name="Login" component={LoginOtpScreen} options={{ headerShown:false, title: 'Login' }} />
        <Stack.Screen name="OTP" component={OtpScreen} options={{ title: '' }} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile page' }} />
        <Stack.Screen name="Logout" component={LogoutScreen} options={{ title: 'Logout page' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InternalNavigation;