import React, { useEffect, useState } from 'react';
import { Button, Card, Text, Badge, Image } from 'react-native-elements';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
import { API_URL } from '../helper';
import { useDispatch, useSelector } from 'react-redux';

const HistoryPage = (props) => {

    const { iduser, username, email, status } = useSelector((state) => {
        console.log(state.userReducer)
        return {
            iduser: state.userReducer.id,
            username: state.userReducer.username,
            email: state.userReducer.email,
            status: state.userReducer.status
        }
    })

    const [transaksi, setTransaksi] = useState([])
    const [listStatus, setListStatus] = useState(["Semua", "Menunggu Konfirmasi", "Terima Pesanan", "Pesanan Batal"])
    const [activeStatus, setActiveStatus] = useState(0)

    useEffect(() => {
        getTransaksiFilter(listStatus[activeStatus], activeStatus)
    }, [])

    const getTransaksiFilter = (status, activeStatus) => {
        axios.get(`${API_URL}/userTransactions?iduser=${iduser}${activeStatus > 0 ? `&status=${status}` : ''}`)
            .then((res) => {
                console.log(res.data)
                setTransaksi(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const printHistory = () => {
        return transaksi.map((value, index) => {

            let badgeColor = value.status.includes("Batal") ? "error" : value.status.includes("Terima") ? "success" : "warning"

            return <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
                <View style={{ backgroundColor: "#1B1464", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 3, paddingVertical: 5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <View>
                        <Text style={{ color: "white" }}>{value.invoice}</Text>
                        <Text style={{ color: "white", fontSize: 9 }}>{value.date}</Text>
                    </View>
                    <Badge value={value.status} status={badgeColor} />
                </View>
                <View style={{ flexDirection: "row", paddingHorizontal: 4, paddingVertical: 5 }}>
                    <View style={{ width: 60, height: 60 }}>
                        <Image source={{ uri: value.detail[0].image }} style={{ width: "100%", height: "100%" }} />
                    </View>
                    <View style={{ borderRight: "1px solid gray", justifyContent: "center", marginLeft: 16 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{value.detail[0].nama}</Text>
                        <Text style={{ color: "gray" }}>{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</Text>
                        <Text style={{ color: "darkgray", fontSize: 12 }}>+{value.detail.length - 1} Produk Lainnya</Text>
                    </View>
                    <View style={{ marginLeft: "auto", marginRight: 3 }}>
                        <Text style={{ color: "gray" }}>Total</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Rp. {value.totalPayment}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row-reverse" }}>
                    <Button
                        title="Lihat Detail"
                        type='outline'
                        buttonStyle={{ padding: 3 }}
                        titleStyle={{ fontSize: 10 }}
                        containerStyle={{ margin: 5 }}
                        onPress={() => props.navigation.navigate("Transaction Detail", { detail: value })}
                    />
                    <Button
                        title="Batalkan Pesanan"
                        disabled={badgeColor == "warning" ? false : true}
                        buttonStyle={{ padding: 3, backgroundColor: "red" }}
                        titleStyle={{ fontSize: 10 }}
                        containerStyle={{ margin: 5 }}
                    />
                </View>
            </Card>
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                {
                    listStatus.map((value, index) => {
                        return <Button
                            type='clear'
                            containerStyle={{ flex: 1, borderBottomWidth: 1 }}
                            titleStyle={{ fontSize: 9 }}
                            title={value}
                            onPress={() => getTransaksiFilter(value, index)}
                        />
                    })
                }
            </View>
            <ScrollView>
                {printHistory()}
            </ScrollView>
        </View>
    )
}

export default HistoryPage;