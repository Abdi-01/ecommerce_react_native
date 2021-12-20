import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { Avatar, Badge, ButtonGroup, Card, Icon, Text } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProfilePage = (props) => {

    const [saldo, setSaldo] = useState([
        {
            nameIcon: "credit-card",
            title: "Promo",
            qty: 7
        },
        {
            nameIcon: "award",
            title: "Reward",
            qty: 7
        },
        {
            nameIcon: "dollar-sign",
            title: "Saldo",
            qty: 700
        }
    ])

    const printSaldo = () => {
        return saldo.map((value, index) => {
            return <View style={{ flex: 1, borderWidth:  0.7, borderColor:"gray", padding:10, borderRadius:10 }}>
                <Icon
                    size={32}
                    type="feather"
                    name={value.nameIcon}
                />
                <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>{value.title}</Text>
                <Text style={{ textAlign: "center" }}>{value.title == "Saldo" && "$"} {value.qty}</Text>
            </View>
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: hp(7) }}>
            <View style={{
                backgroundColor: "#1B1464", flexDirection: "row",
                paddingHorizontal: wp(3),
                paddingVertical: hp(4)
            }}>
                <Avatar
                    rounded
                    size="large"
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsdD1rK4ZtCJVizS00LaWifgJnY-wzSVBoHw&usqp=CAU" }}
                />
                <View style={{ marginLeft: wp(5) }}>
                    <Text style={{ color: "yellow" }} h4>username <Badge value="Active" status="success" /></Text>
                    <Text style={{ color: "white" }} >email@mail.com</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: wp(3), flexDirection: "row", marginTop:hp(3) }}>
                {printSaldo()}
            </View>
        </View>
    )
}

export default ProfilePage;