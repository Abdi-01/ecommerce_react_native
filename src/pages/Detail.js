import React from 'react';
import { StatusBar, View, FlatList } from 'react-native';
import { Text, Icon, Image } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const DetailProduct = (props) => {

    const { nama, kategori, deskripsi, harga, brand, images, stock } = props.route.params.detail

    console.log(props.route.params)
    return (
        <View style={{ flex: 1, backgroundColor: "#f1f2f6", paddingTop: hp(10), paddingHorizontal: wp(2) }}>
            <StatusBar backgroundColor={"#f1f2f6"} />
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
                    <Text h4 >{nama}</Text>
                    <Text style={{ color: "gray" }}>{brand} | {kategori}</Text>
                </View>
                <Text h3 >Rp. {harga}</Text>
            </View>
            <View>

            </View>
        </View>
    )
}

export default DetailProduct;