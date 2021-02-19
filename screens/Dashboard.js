import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, Alert } from "react-native";
import { Card, Title, Paragraph, Button, Avatar } from "react-native-paper";
import HeaderComponent from "./HeaderComponent";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard(props) {
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  // console.warn(props); // console.warn(navigation);
  const { getUserData } = React.useContext(AuthContext);
  const userData = getUserData();
  const userMobile = userData.mobile;
  const userToken = userData.token;
  const navigation = useNavigation();

  useEffect(() => {
    // console.warn(userData);
    fetch(global.apiUrl + "getMasterData", {
      method: "POST",
      headers: {
        // 'content-type':'application/octet-stream',
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/x-www-form-urlencoded;",
        // 'x-rapidapi-host':'example.com',
        // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
      },
      body: "mobile=" + userMobile + "&token=" + userToken,
    })
      .then(function (result) {
        return result.json();
      })
      .then(function (response) {
        // console.warn(response);
        if (response.code == 201) {
          // console.warn(response.data.resultData.productCount);
          Alert.alert("Oops...", response.msg, [{ text: "Cancel" }]);
        } else {
          // console.warn(response.tblproduct.length);
          setProductCount(response.tblproduct.length);
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
      <HeaderComponent headerTitle="Home" headerSubTitle="" locateTo="" />
      <Card
        style={styles.container}
        onPress={() => navigation.navigate("Products", { userData: userData })}
      >
        {/* <Card.Title
				title="Enterprise"
				subtitle="Click to see all enterprise"
				left={LeftContent}
				/> */}
        <Card.Cover
          source={{
            uri: "http://142.93.221.201/sportsnutty/appimages/product.png",
          }}
        />
        <Card.Content>
          <Title>You have {productCount} product added so far</Title>
          {/* <Paragraph>12</Paragraph> */}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate("Add Product")}>
            Add Product
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    margin: 5,
  },
});
