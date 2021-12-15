import React from 'react';
import { StatusBar, View, FlatList, ScrollView } from 'react-native';
import { Text, Icon, Image, Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const DetailProduct = (props) => {

    const { nama, kategori, deskripsi, harga, brand, images, stock } = props.route.params.detail

    console.log(props.route.params)
    const [activeType, setActiveType] = React.useState(0)
    const printType = () => {
        return stock.map((value, index) => {
            if (activeType == index) {
                return <Button
                    title={value.type}
                    type="clear"
                    containerStyle={{
                        marginLeft: 5,
                        backgroundColor: "#00a8ff",
                        borderRadius: 25,
                        paddingHorizontal: 25
                    }}
                    titleStyle={{
                        color: "white"
                    }}

                />
            } else {
                return <Button
                    title={value.type}
                    type="clear"
                    containerStyle={{
                        marginLeft: 5,
                        borderRadius: 25,
                        paddingHorizontal: 25,
                        borderWidth: 1,
                        borderColor: "gray"
                    }}

                />
            }
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#f1f2f6", paddingTop: hp(10), paddingHorizontal: wp(2) }}>
            <StatusBar backgroundColor={"#f1f2f6"} />
            <ScrollView>
                <View style={{ height: hp("50%"), backgroundColor: "white", borderRadius: 25, paddingHorizontal: wp(3), paddingVertical: hp(4) }}>
                    <Icon
                        raised
                        name='arrow-left'
                        type='font-awesome'
                        color="#0058AB"
                        size={15}
                        onPress={() => props.navigation.goBack()}
                        containerStyle={{ marginTop: hp(5), position: 'absolute', zIndex: 20, paddingLeft: -5 }}
                    />
                    <Icon
                        raised
                        name='heart'
                        type='font-awesome'
                        color="#ecf0f1"
                        size={15}
                        containerStyle={{ marginTop: hp(5), position: 'absolute', zIndex: 20, right: 10 }}
                    />
                    <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }}
                                style={{
                                    height: hp(40),
                                    width: wp(92)
                                }} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{ marginTop: 25, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text h4 style={{ color: "#1B1464" }}>{nama}</Text>
                        <Text style={{ color: "gray" }}>{brand} | {kategori}</Text>
                    </View>
                    <Text h3 style={{ color: "#1B1464" }}>Rp. {harga}</Text>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
                    <Text style={{ color: "#1B1464", fontWeight: "800" }}>
                        Choose type : <Text style={{ color: "gray" }}>{stock.length} type</Text>
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 16 }}>
                        {printType()}
                    </View>
                    <Text style={{ color: "#1B1464", fontWeight: "800", marginTop: 20 }}>
                        Description
                    </Text>
                    <Text style={{ textAlign: "justify", marginTop: 10 }}>
                        {deskripsi}
                    </Text>
                </View>
            </ScrollView>
            <Button
                title="Add to Cart"
                type="clear"
                containerStyle={{
                    marginBottom: 10,
                    borderRadius: 25,
                    backgroundColor:"yellow"
                }}
                titleStyle={{
                    color:"#3867d6"
                }}
            />
        </View>
    )
}

export default DetailProduct;