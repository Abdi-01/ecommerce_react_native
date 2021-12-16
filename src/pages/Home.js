import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, TouchableWithoutFeedbackBase, TouchableWithoutFeedback } from 'react-native';
import { Card, Header, Icon, SearchBar, Text } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { API_URL } from '../helper'

const HomePage = (props) => {

    const [promo, setPromo] = useState(["Offers", "What's New", "Inspirations"]);
    const [category, setCategory] = useState(["Office", "Kitchen Set", "Living Room"]);
    const [activeIdx, setActiveIdx] = useState(0)

    const [products, setProducts] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            let res = await axios.get(`${API_URL}/products`)
            // console.log("Success get products ✅ : ", res.data)
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printPromo = () => {
        return promo.map((value, index) => {
            if (activeIdx == index) {
                return <Text key={index.toString()}
                    style={{
                        flex: 1,
                        textAlign: "center",
                        color: "#00a8ff",
                        borderBottomWidth: 2,
                        borderBottomColor: "yellow",
                        paddingBottom: 5
                    }}>
                    {value}
                </Text>
            } else {
                return <Text key={index.toString()} style={{
                    flex: 1,
                    textAlign: "center",
                    color: "gray",
                    paddingBottom: 5
                }}>
                    {value}
                </Text>
            }
        })
    }

    const printCategory = () => {
        return category.map((value, index) => {
            if (activeIdx == index) {
                return <Text key={index.toString()} style={{
                    flex: 1,
                    textAlign: "center",
                    backgroundColor: "#00a8ff",
                    color: "white",
                    borderRadius: 15,
                    padding: 3,
                    marginHorizontal: 4
                }}>
                    {value}
                </Text>
            } else {
                return <Text key={index.toString()} style={{
                    flex: 1,
                    textAlign: "center",
                    backgroundColor: "#ecf0f1",
                    color: "gray",
                    borderRadius: 15,
                    padding: 3,
                    marginHorizontal: 4
                }}>
                    {value}
                </Text>
            }
        })
    }

    const printProducts = () => {
        return products.map((value, index) => {
            return <TouchableWithoutFeedback key={index.toString()} onPress={() => props.navigation.navigate("Detail", { detail: value })}>
                <View style={{ width: wp(43) }} >
                    <Card containerStyle={{ padding: 0, borderWidth: 0, shadowColor: "white" }} >
                        <Card.Image source={{ uri: value.images[0] }} />
                        <Text style={{ fontWeight: "bold", marginTop: 10, color: "#1B1464" }}>{value.nama}</Text>
                        <Text style={{ color: "gray", fontSize: 9 }}>{value.kategori}</Text>
                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "#1B1464" }}>Rp. {value.harga}</Text>
                    </Card>
                </View>
            </TouchableWithoutFeedback>

        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar barStyle='dark-content' />
            <Header
                containerStyle={{ backgroundColor: "white" }}
                placement='left'
                centerComponent={
                    <SearchBar
                        placeholder="Search"
                        containerStyle={desain.searchBar}
                        inputContainerStyle={desain.inputSearch}
                    />
                }

                rightComponent={
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginRight: 10 }}>
                        <Icon type="feather" size={16} name="maximize" />
                    </View>
                }
                backgroundColor="white"
            />
            <View style={{ paddingHorizontal: wp(5), flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                    {printPromo()}
                </View>
                <ScrollView style={{ marginBottom: hp(10) }} showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: hp(3) }}>
                        <Text h2 style={{ color: "#1B1464" }}>Best Offer</Text>
                        <Text style={{ color: "gray" }}>Get our products with the best price</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: hp(2) }}>
                        {printCategory()}
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingTop: hp(3) }}>
                        {printProducts()}
                    </View>
                </ScrollView>
                <Icon
                    reverse
                    raised
                    type="feather"
                    name="search"
                    color="#341f97"
                    containerStyle={{ position: "absolute", bottom: hp(10), right: wp(5) }}
                    iconStyle={{ color: "yellow" }}
                />
            </View>
        </View>
    )
}

const desain = StyleSheet.create({
    searchBar: {
        width: wp(60),
        backgroundColor: "transparent",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        marginLeft: wp(-2)
    },
    inputSearch: {
        backgroundColor: "white",
        height: 40
    }
})

export default HomePage;