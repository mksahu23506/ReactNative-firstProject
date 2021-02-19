import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, StatusBar, RefreshControl } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import axios from 'axios';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

// import DrawerNavigationAfterLogin from '../navigation/DrawerNavigationAfterLogin';

function sendOtp(mobile_arg)
{
  // send otp to login
  if(mobile_arg && mobile_arg.length>1)
  {
    axios({
      url: global.apiUrl+'sendOtp',
      'method': 'POST',
      'headers': {
        // 'content-type':'application/octet-stream',
        'Accept': 'application/json, text/plain, */*',
        "Content-type": "application/x-www-form-urlencoded;"
        // 'x-rapidapi-host':'example.com',
        // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
      },
      'data': {
        mobile: mobile_arg,
      },
    })
    .then(response => {
      // console.log(response.data);
      // console.warn(response.data);
      if(response.data == 'SUCCESS: OTP sent successfully')
      {
        Alert.alert('Wow...', 'LoggedIn Successfully.', [{text:'Cancel'}])
        return(<ShowOtpScreen />);
      }
      else
      {
        Alert.alert('Oops...', 'Invalid Credintials.', [{text:'Cancel'}])
      }

    })
    .catch(error => {
			Alert.alert('Oops...', 'No Internet Connection.', [{text:'Cancel'}])
      // console.warn(error);
    });
  }
  else
  {
    Alert.alert(
			'Oops...',
			'Mobile number is required.',
			[
				{
					text:"Cancel",
					// style:'cancel'
				},
				// {
				// 	text:'OK',
				// 	style:'cancel'
				// }
			]
			 );
  }
}

function checkLogin(email_arg, password_arg)
{
  // console.log(global.isSignedIn);
  // Alert.alert(email_arg+' '+password_arg);
  // global.isSignedIn = true;
  // console.log(global.isSignedIn);
  if(email_arg && password_arg)
  {
		var email_arg = email_arg.trim();
		var password_arg = password_arg.trim();
    // if user provide both email and password, then only allow to login by ajax
    axios({
      url: global.apiUrl+'verifyLogin',
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
        Alert.alert('Wow...', 'LoggedIn Successfully.', [{text:'Cancel'}])
        // return(<DrawerNavigationAfterLogin />);
      }
      else
      {
        Alert.alert('Oops...', 'Invalid Credintials.', [{text:'Cancel'}])
      }

    })
    .catch(error => {
			Alert.alert('Oops...', 'No Internet Connection.', [{text:'Cancel'}])
      // console.warn(error);
    });
  }
  else
  {
    Alert.alert(
			'Oops...',
			'Email and Password are required.',
			[
				{
					text:"Cancel",
					// style:'cancel'
				},
				// {
				// 	text:'OK',
				// 	style:'cancel'
				// }
			]
			 );
  }
}

function ShowOtpScreen({props})
{
  console.warn(props);
  return(
    <TextInput
			label="OTP"
			// value='email'
			mode='flat'
			style={{margin:5}}
			placeholder="Enter OTP"
      keyboardType='numeric'
			onChangeText={(otp) => setOtp(otp)}
		 />
  )
}

export default function LoginScreen({props, route, navigation}) {
	const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
	}, []);
	
  useEffect(() => {
    // alert('component mounted');
    // console.log('login screen, component rendred after load')
    // console.log('hello mohit starts here '); console.log(route); console.log(props); console.log(navigation); console.log('hello mohit ends here ');
  }, []);

	const [mobile, setMobile] = useState('');
	const [otp, setOtp] = useState('');
	
	const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
	// console.warn(email)
  return (
    <View
    style={{flex:1}}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >

    	<StatusBar backgroundColor="green" style="auto"/>
			<Appbar.Header>
      <Appbar.Content 
			title="Login" 
			subtitle="Enter Mobile Number To Get OTP" 
			/>
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
      {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
    </Appbar.Header>

		<Image
			style={styles.image}
			source={require('../assets/wr.png')}
		/>

     <TextInput
			label="Mobile Number"
			// value='email'
			mode='flat'
			style={{margin:5}}
			placeholder="Enter mobile number"
      keyboardType='numeric'
			onChangeText={(mobile) => setMobile(mobile)}
		 />

		<Button 
		style={{margin:15}}
		mode="contained" 
		onPress={()=> sendOtp(mobile)}>
			GET OTP
		</Button>
		</View>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 10,
    backgroundColor: "red",
    width:null,
    height:200,
  },
});