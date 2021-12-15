import React, { useState } from 'react';
import axios from 'axios';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Button, Icon, Image, Input, SocialIcon, Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { API_URL } from '../helper';

const RegisterPage = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [visible, setVisible] = useState({
        icon: "eye",
        secret: true
    })


    const onBtRegis = async () => {
        try {
            let res = await axios.post(`${API_URL}/users`, {
                username,
                email,
                password,
                role:"user",
                status: "Active",
                cart: []
            })

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onBtVisible = () => {
        if (visible.secret) {
            setVisible({
                icon: "eye-off",
                secret: false
            })
        } else {
            setVisible({
                icon: "eye",
                secret: true
            })
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
            <StatusBar backgroundColor={"white"} barStyle='dark-content' />
            <KeyboardAvoidingView behavior="position">
                <View>
                    <Icon
                        name='arrow-left'
                        type='font-awesome'
                        color='#1B1464'
                        containerStyle={{ position: "absolute", zIndex: 10 }}
                        onPress={() => props.navigation.goBack()} />

                    <Image source={require('../assets/regis_asset.png')}
                        style={{ height: hp(35) }}
                    />
                </View>
                <Text h2 style={{ color: "#1B1464" }}>Register</Text>
                <View style={{ marginVertical: hp(3) }}>
                    <Input placeholder="Username"
                        onChangeText={(val) => setUsername(val)}
                        leftIcon={
                            <Icon name="user" type="feather" color="#bdc3c7" />
                        }
                    />
                    <Input placeholder="Email"
                        onChangeText={(val) => setEmail(val)}
                        leftIcon={
                            <Icon name="mail" type="feather" color="#bdc3c7" />
                        }
                    />
                    <Input placeholder="Password"
                        onChangeText={(val) => setPassword(val)}
                        secureTextEntry={visible.secret}
                        leftIcon={
                            <Icon name="lock" type="feather" color="#bdc3c7" />
                        }
                        rightIcon={
                            <Icon name={visible.icon} type="feather" color="#bdc3c7" onPress={onBtVisible} />
                        }
                    />
                    <Text style={{ color: "gray", padding: 3 }}>By Signing up, you're agree to our.
                        <Text style={{ color: "#00a8ff" }}>Terms & Conditions</Text> and <Text style={{ color: "#00a8ff" }}>Privaccy Policy</Text></Text>
                </View>
                <Button
                    title="Register"
                    onPress={onBtRegis}
                    containerStyle={{ borderRadius: 10 }}
                    buttonStyle={{ backgroundColor: "#00a8ff" }}
                />
                <View style={{ marginTop: hp(2.5) }}>
                    <Text style={{ textAlign: "center" }}>
                        Joined us before ?
                        <Text style={{ fontWeight: "bold", color: "#00a8ff" }}>Login</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
};

export default RegisterPage;