import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function SignupScreen({props, route, navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>
        This is SignUp Screen{'\n'}
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          // onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          // onChangeText={(password) => setPassword(password)}
        />
      </View>
      <Button title="Signup" onPress={() => navigation.navigate('Login')}/>
      <Text>{"\n"}</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop:40,
  },
 
  image: {
    marginBottom: 40,
    backgroundColor: "red",
  },
 
  inputView: {
    backgroundColor: "#6bb3e6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    // height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});