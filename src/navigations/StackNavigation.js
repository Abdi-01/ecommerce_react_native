import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register';
import TabNavigation from './TabNavigation';
import DetailProduct from '../pages/Detail';

const Stack = createNativeStackNavigator()
const StackNavigation = (props) => {

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="TabNav" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage}  options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailProduct} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default StackNavigation