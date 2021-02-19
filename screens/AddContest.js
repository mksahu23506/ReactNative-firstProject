import React, {useState, useEffect} from 'react';
import { StyleSheet, View,  } from 'react-native';
import { ActivityIndicator,  DataTable, Button, Avatar} from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import axios from 'axios';

export default function AddContest({props, route, navigation}) {
	const [contestDataRows, setcontestDataRows] = useState();
  const [isLoading, setisLoading] = useState(true);

	useEffect(()=>{
		axios({
			url: global.apiUrl+'getcontest',
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
        setcontestDataRows(response.data.resultData);
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
			<HeaderComponent headerTitle="Add Contest Here" headerSubTitle="" locateTo=""/>

			<DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title>Team Size</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

				{contestDataRows.map((data,key)=>{
					return(
						<DataTable.Row>
							<DataTable.Cell>{key+1}</DataTable.Cell>
							<DataTable.Cell>{data.Contestname}</DataTable.Cell>
							<DataTable.Cell>{data.ContestDescription}</DataTable.Cell>
							<DataTable.Cell>{data.TeamSize}</DataTable.Cell>
							<DataTable.Cell>
								<View>
									<Button icon="pencil" onPress={()=> {console.log('pressedEdit')}}></Button><Button icon="delete" onPress={()=> {console.log('pressedDelete')}}></Button>
								</View>
							</DataTable.Cell>
						</DataTable.Row>
					);
				})}

        {/* <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={page => {
            console.log(page);
          }}
          label="1-2 of 6"
        /> */}
  </DataTable>

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
