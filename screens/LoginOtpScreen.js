import React, {useState, useEffect} from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, StatusBar, RefreshControl } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import axios from 'axios';

class LoginOtpScreen extends React.Component{
	// const [mobile, setMobile] = useState('');
	constructor(props)
	{
		super(props);
		this.state = {
			mobile: '',
			mobileOtp: ''
		};
	}

	sendOtp = (props)=>{
		var mobileNumber = this.state.mobile;
		var thisProps = this.props;
		if(mobileNumber && mobileNumber.length>5)
		{
			fetch(global.apiUrl+'sendOtp',{
				'method': 'POST',
				'headers': {
					// 'content-type':'application/octet-stream',
					'Accept': 'application/json, text/plain, */*',
					"Content-type": "application/x-www-form-urlencoded;"
					// 'x-rapidapi-host':'example.com',
					// 'x-rapidapi-key': process.env.RAPIDAPI_KEY
				},
				'body': 'mobile='+this.state.mobile
			})
			.then(function(result){
        return result.json();
      })
			.then(function(response) {
				// console.warn(response);
				if(response.code == 200)
				{
					thisProps.navigation.navigate('OTP', { mobileNumber: mobileNumber });
					// alert('success');
				}
				else
				{
					Alert.alert('Oops...', response.msg, [{text:'Cancel'}])
				}
			})
			.catch(error => {
				Alert.alert('Oops...', 'No Internet Connection.', [{text:'Cancel'}])
				console.warn(error);
			});
			// alert('otp sent');
			// thisProps.navigation.navigate('OTP', { mobileNumber: mobileNumber });
		}
		else
		{
			Alert.alert('Oops...', 'Invalid Mobile Nubmer.', [{text:'Cancel'}])
			// this.props.navigation.navigate('OTP', { mobileNumber: mobileNumber });
		}
	}

	render(){
		return(
		<View>
			<StatusBar backgroundColor="green" style="auto"/>
			<Appbar.Header>
      <Appbar.Content 
			title="Login" 
			subtitle="Enter Mobile Number To Get OTP" 
			/>
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
			onChangeText={(mobile) => this.setState({'mobile':mobile})}
		 />

		 <Button 
			style={{margin:15}}
			mode="contained" 
			onPress={()=> this.sendOtp()}>
				GET OTP
		</Button>

		</View>
		)
	}
}

export default LoginOtpScreen;

const styles = StyleSheet.create({
  image: {
    margin: 20,
    backgroundColor: "red",
    width:null,
    height:200,
		borderRadius:500
  },
});