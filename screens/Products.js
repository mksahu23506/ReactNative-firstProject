import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import {
  ActivityIndicator,
  List,
  Avatar,
  Divider,
  Button,
} from "react-native-paper";
import HeaderComponent from "./HeaderComponent";

export default function Products({ props, route, navigation }) {
  const [productsDataRows, setproductsDataRows] = useState();
  const [masterData, setMasterData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const { userData } = route.params;
  const userMobileNumber = userData.mobile;
  const userToken = userData.token;

  // const editProduct = (id) => {
  //   // console.log('editedFor'+id);
  //   // CustomNavigation.navigate('Edit Product', {productId:id})
  //   editProduct(id);
  // }

  const editProduct = (productData) => {
    // console.warn(productData);
    navigation.navigate("Edit Product", { productData: productData });
  };
  const deleteProduct = (id) => {
    // console.log(`deletedFor${id}`);
    setisLoading(true);
    fetch(global.apiUrl + "deleteProduct/" + id, {
      method: "POST",
      headers: {
        // 'content-type':'application/octet-stream',
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/x-www-form-urlencoded;",
        // 'x-rapidapi-host':'example.com',
        // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
      },
      body: "mobile=" + userMobileNumber + "&token=" + userToken,
    })
      .then(function (result) {
        return result.json();
      })
      .then(function (response) {
        if (response.code == 200) {
          navigation.navigate("Products");
        } else {
          Alert.alert("Oops...", response.msg, [{ text: "Cancel" }]);
        }
      })
      .catch((error) => {
        setisLoading(false);
        Alert.alert("Oops...", "Something Went Wrong.", [{ text: "Cancel" }]);
        // console.warn(error);
      });
  };

  useEffect(() => {
    fetch(global.apiUrl + "getMasterDataForAllProducts", {
      method: "POST",
      headers: {
        // 'content-type':'application/octet-stream',
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/x-www-form-urlencoded;",
        // 'x-rapidapi-host':'example.com',
        // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
      },
      body: "mobile=" + userMobileNumber + "&token=" + userToken,
    })
      .then(function (result) {
        return result.json();
      })
      .then(function (response) {
        // console.warn(response);
        if (response.code == 201) {
          Alert.alert("Oops...", response.msg, [{ text: "Cancel" }]);
          setMasterData("");
        } else {
          // alert('ok'); // console.warn(response.tblproduct);
          // setproductsDataRows(response.tblproduct);
          setMasterData(response);
          // console.warn(productsDataRows);
        }
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
        Alert.alert("Oops...", "Something Went Wrong.", [{ text: "Cancel" }]);
        // console.warn(error);
      });
  });
  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  if (isLoading) {
    // console.warn('hello react');
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View>
      <HeaderComponent headerTitle="Products" headerSubTitle="" locateTo="" />
      {masterData.length > 0 ? (
        masterData.map((data, key) => {
          return (
            <>
              <List.Item
                key={"p" + key}
                // onPress={()=> showEnterpriseDataInModal(data)}
                left={(props) => (
                  <Avatar.Image
                    key={"i" + data.id}
                    source={{
                      uri: "https://owera.in/datafiles/" + data.image_name,
                    }}
                  />
                )}
                title={data.name}
                description={
                  data.price + ", " + data.cat_name + "\n Notes: " + data.notes
                }
                right={() => (
                  <View key={"pv" + data.id}>
                    <Button
                      key={"b1" + data.id}
                      size={50}
                      icon="pencil"
                      onPress={() => editProduct(data)}
                    ></Button>
                    <Button
                      key={"b2" + data.id}
                      size={50}
                      icon="delete"
                      onPress={() => deleteProduct(data.id)}
                    ></Button>
                  </View>
                )}
              />
              <Divider key={"m" + key} />
            </>
          );
        })
      ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text>You have no product to show. Pleaes add some producst</Text>
            <Button
              style={{ margin: 25 }}
              size={50}
              mode="contained"
              icon="plus"
              onPress={() => navigation.navigate("Add Product")}
            >
              Add Products
          </Button>
          </View>
        )}
      {/* <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
