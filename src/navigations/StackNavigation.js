import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register';
import TabNavigation from './TabNavigation';
import DetailProduct from '../pages/Detail';
import { useDispatch } from 'react-redux';
import { onKeepLogin } from '../actions';
import HistoryPage from '../pages/History';
import DetailTransaction from '../pages/DetailTransaction';
import Account from '../pages/Account';

const Stack = createNativeStackNavigator()
const StackNavigation = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(onKeepLogin())
    }, [])

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="TabNav" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailProduct} options={{ headerShown: false }} />
            <Stack.Screen name="History" component={HistoryPage} />
            <Stack.Screen name="Transaction Detail" component={DetailTransaction} />
            <Stack.Screen name="Account Detail" component={Account} />
        </Stack.Navigator>
    )
}

export default StackNavigation