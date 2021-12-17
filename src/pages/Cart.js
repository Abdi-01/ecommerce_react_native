import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Image, Text, Button, Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CartPage = (props) => {

    const [cart, setCart] = useState([
        {
            nama: "IDALINNEA D",
            type: "M",
            qty: 3,
            image: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg",
            harga: 79000,
        },
        {
            nama: "IDALINNEA D",
            type: "M",
            qty: 3,
            image: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg",
            harga: 79000,
        },
        {
            nama: "IDALINNEA D",
            type: "M",
            qty: 3,
            image: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg",
            harga: 79000,
        },
        {
            nama: "IDALINNEA D",
            type: "M",
            qty: 3,
            image: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg",
            harga: 79000,
        },
        {
            nama: "IDALINNEA D",
            type: "M",
            qty: 3,
            image: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg",
            harga: 79000,
        },
        {
            nama: "IDALINNEA D",
            type: "M",
            qty: 3,
            image: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg",
            harga: 79000,
        }
    ])

    const printCart = () => {
        return cart.map((value, index) => {
            return <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: "#ecf0f1",
                    padding: 5
                }}>
                    <Image source={{ uri: value.image }}
                        style={{
                            width: 60, height: 60,
                        }} />
                </View>
                <View>
                    <Text style={{ fontWeight: "bold", marginTop: 10, color: "#1B1464" }}>{value.nama}</Text>
                    <Text style={{ color: "gray", marginVertical: 4 }}>{value.type}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button type="clear" containerStyle={{
                            backgroundColor: "#ecf0f1",
                            color: "gray",
                            borderRadius: 10,
                            padding: 3,
                            marginHorizontal: 4
                        }} icon={
                            <Icon type="feather" name="minus" size={10} />
                        } />
                        <Text h4 style={{ marginHorizontal: 10, color: "#1B1464" }}>{value.qty}</Text>
                        <Button type="clear" containerStyle={{
                            backgroundColor: "#ecf0f1",
                            color: "gray",
                            borderRadius: 10,
                            padding: 3,
                            marginHorizontal: 4
                        }} icon={
                            <Icon type="feather" name="plus" size={10} />
                        } />
                    </View>
                </View>
                <View>
                    <Text h4 style={{ color: "#1B1464" }}>Rp. {value.harga}</Text>
                    <Icon type="feather" name="trash" size={15} color="gray"
                        style={{ textAlign: "right", marginTop: 10, width: "30%", marginLeft: "auto" }}
                    />
                </View>
            </View>
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: hp(10), paddingHorizontal: wp(5) }}>
            <Text style={{ fontSize: 18, color: "#1B1464", textAlign: "center" }}>Cart</Text>
            <ScrollView style={{ marginVertical: hp(2) }}
                showsVerticalScrollIndicator={false}
            >
                {printCart()}
            </ScrollView>
            <View style={{ marginBottom: hp(8) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464" }}>Shipping</Text>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464", fontWeight: "bold" }}>Rp. 180000</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464" }}>Tax</Text>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464", fontWeight: "bold" }}>Rp. 180000</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464" }}>Total</Text>
                    <Text style={{ fontSize: 20, marginHorizontal: 10, color: "#1B1464", fontWeight: "bold" }}>Rp. 180000</Text>
                </View>
                <Button
                    title="Checkout"
                    type="clear"
                    containerStyle={{
                        marginVertical: 10,
                        borderRadius: 25,
                        backgroundColor: "yellow"
                    }}
                    titleStyle={{
                        color: "#3867d6"
                    }}
                />
            </View>
        </View>
    )
}

export default CartPage;