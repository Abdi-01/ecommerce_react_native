import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CartPage = (props) => {

    return (
        <View style={{ flex: 1, backgroundColor: "red", paddingTop: hp(10) }}>
            <Text h3>1 Cart Page Ecommerce</Text>
        </View>
    )
}

export default CartPage;