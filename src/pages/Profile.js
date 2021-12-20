import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { Avatar, Badge, ButtonGroup, Card, Icon, ListItem, Text } from 'react-native-elements';
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

    const [menuAccount, setMenuAccount] = useState([
        {
            title: "Transactions",
            icon: "cart",
            press: () => { }
        },
        {
            title: "My Promo",
            icon: "card-bulleted-outline",
            press: () => { }
        },
        {
            title: "Address List",
            icon: "map",
            press: () => { }
        }
    ])

    const [menuSettings, setMenuSettings] = useState([
        {
            title: "Settings",
            icon: "cog-outline",
            press: () => { }
        },
        {
            title: "Privacy and Police",
            icon: "shield-account",
            press: () => { }
        },
        {
            title: "Logout",
            icon: "logout",
            press: () => { }
        }
    ])

    const printMenuAccount = () => {
        return menuAccount.map((value, index) => {
            return <ListItem key={index.toString()}>
                <Icon name={value.icon} size={25} type='material-community' color="#1B1464" />
                <ListItem.Content>
                    <ListItem.Title>{value.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        })
    }

    const printMenuSettings = () => {
        return menuSettings.map((value, index) => {
            return <ListItem key={index.toString()}>
                <Icon name={value.icon} size={25} type='material-community' color="#1B1464" />
                <ListItem.Content>
                    <ListItem.Title>{value.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        })
    }

    const printSaldo = () => {
        return saldo.map((value, index) => {
            return <View style={{ flex: 1, borderWidth: 0.7, borderColor: "gray", padding: 10, borderRadius: 10, backgroundColor: "white" }}>
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
                backgroundColor: "#1B1464",
                paddingHorizontal: wp(3),
                paddingVertical: hp(4)
            }}>
                <View style={{ flexDirection: "row" }}>
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
                <View style={{ flexDirection: "row", marginTop: hp(5) }}>
                    {printSaldo()}
                </View>
            </View>
            <View style={{
                paddingHorizontal: wp(3),
                backgroundColor: "white",
                paddingTop: hp(3),
                marginTop: hp(-3),
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}>
                <View>
                    <Text h4 style={{ color: "#1B1464" }}>Account</Text>
                    {printMenuAccount()}
                </View>
                <View>
                    <Text h4 style={{ color: "#1B1464" }}>Settings</Text>
                    {printMenuSettings()}
                </View>
            </View>
        </View>
    )
}

export default ProfilePage;