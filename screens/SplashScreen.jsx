import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import DrawerNavigation from '../navigation/DrawerNavigation';

export default function SplashScreen({props, route, navigation}) {

  // useEffect(() => {
  //   // alert('component mounted');
  //   // console.log('component rendred after load')
  //   // console.log('hello mohit starts here '); console.log(route); console.log(props); console.log(navigation); console.log('hello mohit ends here ');
  // }, []);
  
  return (
    <View style={styles.container}>
      <Text>This is Splash screen</Text>
      <Text>{"\n"}</Text>
      {/* <Text>{global.mksahu}</Text>
      <Text>{"\n"}</Text> */}
      <StatusBar style="auto" />
      <Button title="Go To Login" onPress={() => navigation.navigate('Login', {passArguments:'put value here'})}/>
      <Text>{"\n"}</Text>
      <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()}/>
    </View>
  );
}

// componentDidMount()
// {
//   alert('component mounted');
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
