import React, {useEffect, useState} from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { Appbar, ToggleButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

// const signOut() = ()=> {
// 	Alert.alert(
// 		'Oh..Oh...',
// 		'Are you sure want to logout',
// 		[
// 			{
// 				text:'yes',
// 				onPress: makeLogout
// 			},
// 			{
// 				text:'No',
// 				// onPress: ()=>console.warn('no pressed')
// 			}
// 		]
// 		);
// }


// const makeLogout = ()=> {
// 	console.warn('yes pressed');
// }

export default function HeaderComponent(props) {
	// console.warn(React.useContext());
	const { signOut } = React.useContext(AuthContext);
  const [showAddForm, setshowAddForm] = useState('');
  const [showPlusIcon, setshowPlusIcon] = useState('');
	const navigation = useNavigation();
	// console.warn(props.headerTitle);
	useEffect(()=>{
		if(props.locateTo.length>0)
		{
			setshowAddForm(navigation.navigate(props.locateTo));
			setshowPlusIcon('plus');
		}
		// console.warn(signOut);
	},[]);
  return (
		<View>
			<StatusBar backgroundColor="green" style="auto"/>
				{/* <Appbar.Header>
				<Appbar.BackAction
				color='white'
				accessibilityLabel='Open Navigation'
				onPress={() => navigation.toggleDrawer()}
				/>

				<ToggleButton
					icon="format-align-justify"
					value="Open Navigation"
					color='white'
					onPress={() => navigation.toggleDrawer()}
				/>

				<Appbar.Content 
				title={props.headerTitle} 
				subtitle={props.headerSubTitle} 
				/>
				<Appbar.Action icon="magnify" onPress={_handleSearch} />
				<Appbar.Action icon="dots-vertical" onPress={_handleMore} />
			</Appbar.Header> */}
			
			<Appbar>
			<ToggleButton
					icon="format-align-justify"
					value="Open Navigation"
					color='white'
					onPress={() => navigation.toggleDrawer()}
				/>

				<Appbar.Content 
				title={props.headerTitle} 
				subtitle={props.headerSubTitle} 
				/>

				{/* <Appbar.Action
					icon={showPlusIcon}
					onPress={() => showAddForm}
				/> */}

				<Appbar.Action
					icon="home"
					onPress={() => navigation.navigate('Home')}
				/>

				<Appbar.Action
					icon="logout"
					onPress={()=> signOut()}
				/>
			</Appbar>
		</View>
  );
}