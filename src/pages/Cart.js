import React, { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Image, Text, Button, Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserCart } from '../actions'

const CartPage = (props) => {

    const dispatch = useDispatch()
    // mengambil data cart sebelumnya dari global storage
    const { cart, iduser } = useSelector((state) => {
        console.log(state.userReducer)
        return {
            cart: state.userReducer.cart,
            iduser: state.userReducer.id
        }
    })

    const onBtDec = (index) => {
        let temp = [...cart];

        if (temp[index].qty > 1) {
            temp[index].qty -= 1
            dispatch(updateUserCart(temp, iduser))
        } else {
            Alert.alert("Attention ⚠️", "Want to delete this product ?",
                [
                    {
                        text: "Yes",
                        onPress: () => onBtDelete(index)
                    },
                    {
                        text: "No"
                    }
                ])
        }
    }

    const onBtDelete = (index) => {
        let temp = [...cart];
        temp.splice(index, 1)
        dispatch(updateUserCart(temp, iduser))
    }

    const onBtInc = (index) => {
        let temp = [...cart];
        temp[index].qty += 1
        dispatch(updateUserCart(temp, iduser))
    }

    const totalPrice = () => {
        let total = 0;

        cart.forEach((value, index) => total += value.qty * value.harga)
        return { total, tax: total * 10 / 100, ongkir: total * 20 / 100, totalPayment: total + (total * 10 / 100) + (total * 20 / 100) }
    }

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
                        }
                            onPress={() => onBtDec(index)}
                        />
                        <Text h4 style={{ marginHorizontal: 10, color: "#1B1464" }}>{value.qty}</Text>
                        <Button type="clear" containerStyle={{
                            backgroundColor: "#ecf0f1",
                            color: "gray",
                            borderRadius: 10,
                            padding: 3,
                            marginHorizontal: 4
                        }} icon={
                            <Icon type="feather" name="plus" size={10} />
                        }
                            onPress={() => onBtInc(index)}
                        />
                    </View>
                </View>
                <View style={{ width: "33%" }}>
                    <Text style={{ color: "#1B1464", fontSize: 16, fontWeight: "bold" }}>Rp. {value.harga}</Text>
                    <Icon type="feather"
                        name="trash"
                        size={15}
                        color="red"
                        onPress={() => onBtDelete(index)}
                        style={{ textAlign: "right", marginTop: 10, width: "30%", marginLeft: "auto", backgroundColor: "red" }}
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
                    <Text style={{ marginHorizontal: 10, color: "#1B1464" }}>Shipping (Total*20%)</Text>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464", fontWeight: "bold" }}>Rp. {totalPrice().ongkir}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464" }}>Tax (Total*10%)</Text>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464", fontWeight: "bold" }}>Rp. {totalPrice().tax}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ marginHorizontal: 10, color: "#1B1464" }}>Total</Text>
                    <Text style={{ fontSize: 20, marginHorizontal: 10, color: "#1B1464", fontWeight: "bold" }}>Rp. {totalPrice().total}</Text>
                </View>
                <Button
                    title={`Checkout Rp. ${totalPrice().totalPayment}`}
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