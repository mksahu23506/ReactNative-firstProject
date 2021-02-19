import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
// import DrawerNavigationAfterLogin from '../navigation/DrawerNavigationAfterLogin';

export default function LoginScreen({props, route, navigation}) {
  useEffect(() => {
    // alert('component mounted');
    console.log('login screen, component rendred after load')
    // console.log('hello mohit starts here '); console.log(route); console.log(props); console.log(navigation); console.log('hello mohit ends here ');
  }, []);

  const [email, setEmail] = useState("putEmailhere");
  const [password, setPassword] = useState("set password here");

  return (
    // <View style={styles.container}>
    //   <Text>This Is Login Screen!</Text>
    //   {/* <Text>{route.params.passArguments}</Text> */}
    //   <StatusBar style="auto" />
    //   <Button title="Go To Profile" onPress={() => navigation.navigate('Profile')}/>
    //   {/* <Text>{global.mksahu}</Text> */}
    //   <Text>{"\n"}</Text>
    //   <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()}/>
    // </View>
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/icon1.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity> */}
 
      {/* <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={()=> {alert('hello')}}>LOGIN</Text>
      </TouchableOpacity> */}
      <Button title="LOGIN" onPress={()=> {checkLogin(email, password)}}/>
      <Text>{'\n'}</Text>
      <Button title="Signup" onPress={()=> {navigation.navigate('Signup')}}/>

      {/* <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={()=> {navigation.navigate('Signup')}}>SIGNUP</Text>
      </TouchableOpacity> */}
      {/* <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()}/> */}
    </View>
  );
}

function checkLogin(email_arg, password_arg)
{
  // console.log(global.isSignedIn);
  // alert(email_arg+' '+password_arg);
  // global.isSignedIn = true;
  // console.log(global.isSignedIn);
  var email_arg = email_arg.trim();
  var password_arg = password_arg.trim();
  if(email_arg.trim() && password_arg.trim())
  {
    // if user provide both email and password, then only allow to login by ajax
    axios({
      url: global.apiUrl,
      'method': 'POST',
      'headers': {
        // 'content-type':'application/octet-stream',
        'Accept': 'application/json, text/plain, */*',
        "Content-type": "application/x-www-form-urlencoded;"
        // 'x-rapidapi-host':'example.com',
        // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
      },
      'data': {
        email: email_arg,
        password: password_arg,
      },

    })
    .then(response => {
      // console.log(response.data);
      if(response.data.code == 200)
      {
        alert('Login Successfully.');
        // return(<DrawerNavigationAfterLogin />);
      }
      else
      {
        alert('Invalid Credintials.');
      }

    })
    .catch(error => {
      alert('inalid api');
      console.warn(error);
    });
  }
  else
  {
    alert('Email and Password are required.');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ff00",
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