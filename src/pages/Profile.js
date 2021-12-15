import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const ProfilePage =(props)=>{

    return(
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: hp(10) }}>
            <Text h3>Profile Page Ecommerce</Text>
        </View>
    )
}

export default ProfilePage;