import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button, Divider, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Textarea from 'react-native-textarea';
import HeaderComponent from './HeaderComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';
import DatePicker from 'react-native-datepicker'


export default function EditProduct({ props, route, navigation }) {
	// console.warn(route.params.productData);
	const { getUserData } = React.useContext(AuthContext);
	// console.warn(getUserData());
	const userData = getUserData();
	const userMobile = userData.mobile;
	const userToken = userData.token;
	// const [productData, setproductData] = useState(route.params.productData);

	const [productName, setproductName] = useState(route.params.productData.name);
	const [productCategory, setproductCategory] = useState(route.params.productData.category_id);
	const [purchaseDate, setpurchaseDate] = useState(route.params.productData.purchase_date);
	const [productPrice, setproductPrice] = useState(route.params.productData.price);
	const [currency, setcurrency] = useState(route.params.productData.currency_id);
	const [notes, setnotes] = useState(route.params.productData.notes);
	const [selectedCategory, setselectedCategory] = useState(route.params.productData.category_id);
	const [selectedCurrency, setselectedCurrency] = useState(route.params.productData.currency_id);

	const [currencyList, setcurrencyList] = useState();
	const [productCategoryList, setproductCategoryList] = useState();
	const [isLoading, setisLoading] = useState(true);

	const [hasService, sethasService] = useState(false);
	const [nextServiceDate, setnextServiceDate] = useState();
	const [hasWarranty, sethasWarranty] = useState(false);
	const [warrantyEndDate, setwarrantyEndDate] = useState();

	useEffect(() => {
		// alert(userMobile+', '+userToken) // alert(userToken)
		// console.warn(productData);

		setTimeout(() => {
			// calling the below fetch method to get the master dropdown list
			fetch(global.apiUrl+'getMasterData', {
				'method': 'POST',
				'headers': {
					// 'content-type':'application/octet-stream', r
					'Accept': 'application/json, text/plain, */*',
					"Content-type": "application/x-www-form-urlencoded;"
					// 'x-rapidapi-host':'example.com',
					// 'x-rapidapi-key': process.env.RAPIDAPI_KEY
				},
				'body': 'mobile='+userMobile+'&token='+userToken,
			})
				.then(function (result) {
					return result.json();
				})
				.then(function (response) {
					// console.warn(response);
					if (response.code == 201) {
						// console.warn(response.data.resultData.productCount);
						Alert.alert('Oops...', response.msg, [{ text: 'Cancel' }])
					}
					else {
						// console.log(response.mstcategory); console.log(response.mstcurrency);
						setcurrencyList(response.mstcurrency);
						setproductCategoryList(response.mstcategory);
					}
					setisLoading(false);
				})
				.catch(error => {
					setisLoading(false);
					Alert.alert('Oops...', 'Something Went Wrong.', [{ text: 'Cancel' }])
					// console.warn(error);
				});
		}, 1000);
		// // calling the below fetch method to get the product data
		// fetch(global.apiUrl+'editProduct/'+productId,{
		// 	'method': 'POST',
		// 	'headers': {
		// 		// 'content-type':'application/octet-stream', r
		// 		'Accept': 'application/json, text/plain, */*',
		// 		"Content-type": "application/x-www-form-urlencoded;"
		// 		// 'x-rapidapi-host':'example.com',
		// 		// 'x-rapidapi-key': process.env.RAPIDAPI_KEY
		// 	},
		// 	'body': 'mobile='+userMobile+'&token='+userToken,
		// })
		// .then(function(result){
		// 	return result.json();
		// })
		// .then(function(response){
		// 	// console.warn(response);
		// 	if(response.code == 201)
		// 	{
		// 		// console.warn(response.data.resultData.productCount);
		// 		Alert.alert('Oops...',response.msg, [{text:'Cancel'}])
		// 	}
		// 	else
		// 	{
		// 		console.log(response); // console.log(response.mstcurrency);
		// 		setproductName();
		// 		setproductCategory();
		// 		setpurchaseDate();
		// 		setproductPrice();
		// 		setcurrency();
		// 		setnotes();
		// 		setselectedCategory();
		// 		setselectedCurrency();
		// 	}
		// 	setisLoading(false);
		// })
		// .catch(error => {
		// 	setisLoading(false);
		// 	Alert.alert('Oops...', 'Something Went Wrong.', [{text:'Cancel'}])
		// 	// console.warn(error);
		// });
	}, []);

	const setProductCategoryAndDefaultValue = (categoryId) => {
		setproductCategory(categoryId);
		setselectedCategory(categoryId);
	}

	const setCurrencyAndDefaultValue = (currencyId) => {
		setcurrency(currencyId);
		setselectedCurrency(currencyId);
	}

	const updateProductData = () => {
		setisLoading(true);
		// console.warn(productName); console.warn(productCategory); console.warn(purchaseDate); console.warn(productPrice); console.warn(currency); console.warn(notes);
		fetch(global.apiUrl+'editProduct/'+route.params.productData.id, {
			'method': 'POST',
			'headers': {
				// 'content-type':'application/octet-stream', r
				'Accept': 'application/json, text/plain, */*',
				"Content-type": "application/x-www-form-urlencoded;"
				// 'x-rapidapi-host':'example.com',
				// 'x-rapidapi-key': process.env.RAPIDAPI_KEY
			},
			'body': 'mobile='+userMobile+'&token='+userToken+'&name='+productName+'&category_id='+productCategory+'&has_warranty='+(hasWarranty?1:0)+'&warranty_end_date='+warrantyEndDate+'&has_service='+(hasService?1:0)+'&next_service_due_date='+nextServiceDate+'&purchase_date='+purchaseDate+'&price='+productPrice+'&currency_id='+currency+'&notes='+notes,

		})
			.then(function (result) {
				return result.json();
			})
			.then(function (response) {
				console.log(response);
				setisLoading(false);
				if (response.code == 201) {
					// console.warn(response.data.resultData.productCount);
					Alert.alert('Oops...', response.msg, [{ text: 'Cancel' }])
				}
				else {
					// alert('navigate to products page');
					navigation.navigate('Products');
				}
			})
			.catch(error => {
				setisLoading(false);
				Alert.alert('Oops...', 'Something Went Wrong.', [{ text: 'Cancel' }])
				// console.warn(error);
			});
	}

	if (isLoading) {
		// console.warn('hello react');
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="red" />
			</View>
		);
	}

	return (
		<ScrollView>
			<HeaderComponent headerTitle="Edit Product" headerSubTitle="Fill details to add product" locateTo="" />
			<TextInput
				label="Name"
				value={productName}
				mode='flat'
				style={{ margin: 5 }}
				placeholder="Enter mobile number"
				onChangeText={(name) => setproductName(name)}
			/>

			<Divider />
			{/* <Text>Select Product Category</Text> */}
			<Picker
				selectedValue={selectedCategory}
				style={{ height: 50, width: null }}
				onValueChange={(itemValue, itemIndex) => setProductCategoryAndDefaultValue(itemValue)}
			>
				<Picker.Item label="-- Select Product Category--" value="" />
				{/* showing the product category from table in a loop */}
				{
					(productCategoryList.length > 0) ?
						productCategoryList.map((data, key) => {
							return (
								<Picker.Item key={'cat_'+data.id} label={data.name} value={data.id} />
							)
						})
						:
						{/* <Picker.Item label={data.name} value={data.id} /> */ }
				}
			</Picker>
			<Divider />

			<DatePicker
				date={purchaseDate}
				testID="DatePicker"
				mode='date'
				maxDate={new Date()}
				style={{ margin: 5, width: null }}
				placeholder="Select Purchase Date"
				format="YYYY-MM-DD"
				onDateChange={(date) => { setpurchaseDate(date) }}
			/>

			<TextInput
				label="Price"
				value={productPrice}
				mode='flat'
				style={{ margin: 5 }}
				placeholder="Enter Product Purchase Price"
				keyboardType='numeric'
				onChangeText={(price) => setproductPrice(price)}
			/>

			<Divider />
			{/* <Text>Select currency</Text> */}
			<Picker
				selectedValue={selectedCurrency}
				style={{ height: 50, width: null }}
				onValueChange={(itemValue, itemIndex) => setCurrencyAndDefaultValue(itemValue)}
			>
				<Picker.Item label="-- Select Currency--" value="" />
				{
					(currencyList.length > 0) ?
						currencyList.map((data, key) => {
							return (
								<Picker.Item key={'cur_'+data.id} label={data.symbol+' ('+data.name+')'} value={data.id} />
							)
						})
						:
						{/* <Picker.Item label={data.name} value={data.id} /> */ }
				}
			</Picker>

			<Divider />

			<Checkbox.Item
				label="Has Service"
				uncheckedColor='red'
				color='blue'
				status={hasService ? 'checked' : 'unchecked'}
				onPress={() => sethasService(!hasService)}
			/>

			{hasService ? (
				<>
					<Divider />
					<DatePicker
						date={nextServiceDate}
						testID="DatePicker"
						mode='date'
						// maxDate={new Date()}
						style={{ margin: 5, width: null }}
						placeholder="Select next service due date"
						format="YYYY-MM-DD"
						onDateChange={(serviceDate) => { setnextServiceDate(serviceDate) }}
					/>
				</>
			) : (<Divider />)
			}



			<Checkbox.Item
				label="Has Warranty"
				uncheckedColor='red'
				color='blue'
				status={hasWarranty ? 'checked' : 'unchecked'}
				onPress={() => sethasWarranty(!hasWarranty)}
			/>

			{hasWarranty ? (
				<>
					<Divider />
					<DatePicker
						date={warrantyEndDate}
						testID="DatePicker"
						mode='date'
						// maxDate={new Date()}
						style={{ margin: 5, width: null }}
						placeholder="Select warranty end date"
						format="YYYY-MM-DD"
						onDateChange={(endDate) => { setwarrantyEndDate(endDate) }}
					/>
				</>
			) : (<Divider />)
			}

			{/* <Text>Put Product Description Below:</Text> */}
			<TextInput
				value={notes}
				multiline={true}
				numberOfLines={4}
				style={{ margin: 10, flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'grey', borderRadius: 10 }}
				maxLength={150}
				placeholder=" Put your product description/notes here, MAX 150 characters "
				onChangeText={(notes) => setnotes(notes)}
			/>
			<Divider />

			{/* <TextInput
				label="Image"
				// value='email'
				mode='flat'
				style={{margin:5}}
				placeholder="Enter mobile number"
				onChangeText={(pd) => console.log(pd)}
		 /> */}
			<Button style={{ margin: 15 }} mode="contained" onPress={() => updateProductData()}> Update </Button>
			<Button style={{ margin: 15 }} mode="contained" color='red' onPress={() => navigation.navigate('Products', { userData: userData })}> Cancel </Button>
		</ScrollView>
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
