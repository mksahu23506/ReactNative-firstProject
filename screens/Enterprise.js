import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { ActivityIndicator, List, Avatar, Divider, Button} from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import axios from 'axios';

const editEnterprise = (EnterpriseId) => {
  // console.log('editedFor'+EnterpriseId);
}

const deleteEnterprise = (EnterpriseId) => {
  // console.log('deletedFor'+EnterpriseId);
}

const showEnterpriseDataInModal = (enterpriseData) => {
  // console.log(enterpriseData);
  // const containerStyle = {backgroundColor: 'white', padding: 20};
}

export default function Enterprise({props, route, navigation}) {
  const [enterpriseDataRows, setenterpriseDataRows] = useState();
  const [isLoading, setisLoading] = useState(true);
   
	useEffect(()=>{
		axios({
			url: global.apiUrl+'getEnterprise',
			'method': 'POST',
			'headers': {
				// 'content-type':'application/octet-stream',
				'Accept': 'application/json, text/plain, */*',
				"Content-type": "application/x-www-form-urlencoded;"
				// 'x-rapidapi-host':'example.com',
				// 'x-rapidapi-key': process.env.RAPIDAPI_KEY
			},
			'data': {},
		})
		.then(response=>{
      // console.warn(response.data);
			if(response.data.code == 200)
			{
        // console.log(response.data.resultData);
        setenterpriseDataRows(response.data.resultData);
			}
			else
			{
        Alert.alert('Oops...',response.data.msg, [{text:'Cancel'}])
			}
      setisLoading(false);
		})
		.catch(error => {
      setisLoading(false);
			Alert.alert('Oops...', 'Something Went Wrong.', [{text:'Cancel'}])
			// console.warn(error);
		});
	});
	// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
	if(isLoading)
  {
    // console.warn('hello react');
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  
  return (
		<View>
			<HeaderComponent headerTitle="Enterprise" headerSubTitle="" locateTo="AddEnterprise"/>

          {enterpriseDataRows.map((data, key)=>{
            return(
                <>
                <List.Item
                  onPress={()=> showEnterpriseDataInModal(data)}
                  left={props => <Avatar.Text {...props} color={'white'} label={((data.FirstName).charAt(0)).toUpperCase()+' '+((data.LastName).charAt(0)).toUpperCase()} />}
                  title={data.FirstName+' '+data.LastName}
                  description={data.EmaiId+', '+data.ContactNumber+'\n'+data.Addresss}
                  right={() => <View><Button size={50} icon="pencil" onPress={()=>editEnterprise(data.EnterpriseId)}></Button><Button size={50} icon="delete" onPress={()=>deleteEnterprise(data.EnterpriseId)}></Button></View>}
                />
                <Divider />
                </>
            )
          })}
			{/* <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()}/> */}
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
