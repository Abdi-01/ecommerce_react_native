import React, { useState } from 'react';
import axios from 'axios';
import { View, StatusBar, KeyboardAvoidingView, Alert, Easing } from 'react-native';
import { Button, Icon, Image, Input, SocialIcon, Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { API_URL } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../actions'
import { StackActions } from '@react-navigation/native';

const LoginPage = (props) => {
    // useDispatch : digunakan untuk menjalankan fungsi dari actions, pengganti connect pada class component
    const dispatch = useDispatch();

    // useSelctor : pengganti mapToProps pada class component
    const { iduser,email } = useSelector((state) => {
        return {
            iduser: state.userReducer.id,
            email: state.userReducer.email
        }
    })


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState({
        icon: "eye",
        secret: true
    })


    const onBtLogin = async () => {

        let respon = await dispatch(onLogin(username, password));
        console.log("test", respon.success)
        // let res = await axios.get(`${API_URL}/users?username=${username}&password=${password}`)

        if (respon.success > 0) {
            // props.navigation.dispatch(StackActions.replace("TabNav"))
        } else {
            Alert.alert("Attention ⚠️", "This account is not exist")
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
                <Image source={require('../assets/login_asset.png')}
                    style={{ height: hp(35) }}
                />
                <Text h2 style={{ color: "#1B1464" }}>Login</Text>
                <View style={{ marginVertical: hp(3) }}>
                    <Input placeholder="Input Username"
                        onChangeText={(val) => setUsername(val)}
                        leftIcon={
                            <Icon name="user" type="feather" color="#bdc3c7" />
                        }
                    />
                    <Input placeholder="Input Password"
                        onChangeText={(val) => setPassword(val)}
                        secureTextEntry={visible.secret}
                        leftIcon={
                            <Icon name="lock" type="feather" color="#bdc3c7" />
                        }
                        rightIcon={
                            <Icon name={visible.icon} type="feather" color="#bdc3c7" onPress={onBtVisible} />
                        }
                    />
                    <Text style={{ fontWeight: "bold", color: "#00a8ff", textAlign: "right" }}>Forgot Password ?</Text>
                </View>
                <Button
                    title="Login"
                    onPress={onBtLogin}
                    containerStyle={{ borderRadius: 10 }}
                    buttonStyle={{ backgroundColor: "#00a8ff" }}
                />
                <Text style={{ textAlign: "center", color: "gray", marginVertical: hp(3) }}>OR</Text>
                <Button
                    title="Login with Google"
                    containerStyle={{ borderRadius: 10 }}
                    titleStyle={{ color: "black" }}
                    icon={<SocialIcon type="google" iconSize={10} raised={false} />}
                    buttonStyle={{ backgroundColor: "#ecf0f1" }}
                />
                <View style={{ marginTop: hp(2.5) }}>
                    <Text style={{ textAlign: "center" }}>
                        No have account ?
                        <Text
                            style={{ fontWeight: "bold", color: "#00a8ff" }}
                            onPress={() => props.navigation.navigate("Register")}
                        >
                            Register
                        </Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
};

export default LoginPage;