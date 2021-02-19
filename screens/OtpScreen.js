import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, Alert, StatusBar, RefreshControl } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

export default function OtpScreen(props){
	// console.warn(route); console.warn(navigation); console.warn(props);
	const { signIn } = React.useContext(AuthContext);
	const [userMobileNumber, setUserMobileNumber] = useState(props.route.params.mobileNumber);
	const [userOtp, setUserOtp] = useState();
  const [isLoading, setisLoading] = useState(false);

	const verifyLogin = (props)=>{
    var mobileNumber = userMobileNumber;
		var mobileOtp = userOtp;
		setisLoading(true);
		// alert(mobileNumber+', '+mobileOtp)
		if(mobileOtp && mobileOtp.length>1)
		{
			fetch(global.apiUrl+'login',{
				'method': 'POST',
				'headers': {
					// 'content-type':'application/octet-stream',
					'Accept': 'application/json, text/plain, */*',
					"Content-type": "application/x-www-form-urlencoded;"
					// 'x-rapidapi-host':'example.com',
					// 'x-rapidapi-key': process.env.RAPIDAPI_KEY
				},
				'body': 'mobile='+mobileNumber+'&otp='+mobileOtp
			})
      .then(function(result){
        return result.json();
      })
			.then(function(response) {
        if(response.code == 201)
				{
					Alert.alert('Oopssss...', response.msg, [{text:'Cancel'}])
					setisLoading(false);
				}
				else
				{
					// alert('loggedIn')
					signIn(response.users)
					// console.warn(response);
				}
			})
			.catch(error => {
				Alert.alert('Oops...', 'No Internet Connection.', [{text:'Cancel'}])
				// console.warn(error);
			});
		}
		else
		{
			Alert.alert('Oops...', 'Invalid OTP.', [{text:'Cancel'}])
		}
	}

	if(isLoading)
  {
    // console.warn('hello react');
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

	return(
	<View>
		<StatusBar backgroundColor="green" style="auto"/>
		<Appbar.Header>
		<Appbar.Content 
		title="OTP" 
		subtitle={"Enter OTP Sent In "+userMobileNumber} 
		/>
	</Appbar.Header>

	<Image
		style={styles.image}
		source={require('../assets/wr.png')}
	/>

	<TextInput
		label="OTP"
		// value='email'
		mode='flat'
		style={{margin:5}}
		placeholder="Enter OTP Here"
		keyboardType='numeric'
		onChangeText={(otp) => setUserOtp(otp)}
	 />

	 <Button 
		style={{margin:15}}
		mode="contained" 
		onPress={verifyLogin}>
			Login
	</Button>

	</View>
	)
}


const styles = StyleSheet.create({
  image: {
    margin: 20,
    backgroundColor: "red",
    width:null,
    height:200,
		borderRadius:500
  },
});