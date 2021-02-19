import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from "react-native";
import NavigationBeforeLogin from "./navigation/NavigationBeforeLogin";
import NavigationAfterLogin from "./navigation/NavigationAfterLogin";
import { AuthContext } from "./context/AuthContext";

global.mksahu = "\n This is global variable value \n";
// global.isSignedIn = false;
global.apiUrl = "https://owera.in/wr/api/";
export default function App({ props, route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userMobileNumber, setuserMobileNumber] = useState();
  const [userToken, setuserToken] = useState();
  const [usersTableData, setusersTableData] = useState();

  const authContext = React.useMemo(() => ({
    // requestOtp: ()=> {
    //   // put the code here to request the otp to the given number
    //   alert('opto sent');
    // },
    signIn: (userDataFromTable) => {
      setusersTableData(userDataFromTable);
      // setIsLoading(false);
      setuserMobileNumber(userDataFromTable.mobile);
      setuserToken(userDataFromTable.token);
    },
    getUserData: () => {
      return usersTableData;
    },
    signOut: () => {
      Alert.alert("Oh..Oh...", "Are you sure want to logout", [
        {
          text: "yes",
          onPress: makeLogout,
        },
        {
          text: "No",
          // onPress: ()=>console.warn('no pressed')
        },
      ]);
    },
  }));

  const makeLogout = () => {
    setIsLoading(false);
    setuserToken(null);
  };
  // console.log('hello mohit starts here '); console.log(route); console.log(props); console.log(navigation); console.log('hello mohit ends here ');
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // setuserToken('set some value');
      // console.warn('useEffect '+isLoading);
    }, 1000);
  }, []);
  // show activity indicator
  if (isLoading) {
    // console.warn('hello react');
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  return (
    // put the routing under authContext
    <AuthContext.Provider value={authContext}>
      {userToken != null ? <NavigationAfterLogin /> : <NavigationBeforeLogin />}
    </AuthContext.Provider>
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
