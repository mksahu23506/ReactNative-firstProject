import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../screens/Dashboard';
import Products from '../screens/Products';
import AddProduct from '../screens/AddProduct';
import EditProduct from '../screens/EditProduct';

const Drawer = createDrawerNavigator();

const DrawerNavigationAfterLogin = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Dashboard} options={{ title: 'Home' }} />
        <Drawer.Screen name="Products" component={Products} options={{ title: 'Products' }} />
        <Drawer.Screen name="Add Product" component={AddProduct} options={{ title: 'Add Product' }} />
        <Drawer.Screen name="Edit Product" component={EditProduct} options={{ title: '' }} />
        {/* <Drawer.Screen name="Logout" component={LogoutScreen} options={{ title: 'Logout' }} onPress={()=> alert('welcome')}/> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigationAfterLogin;