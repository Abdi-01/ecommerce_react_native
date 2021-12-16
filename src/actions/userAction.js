import axios from "axios"
import { API_URL } from "../helper"
import AsyncStorageLib from "@react-native-async-storage/async-storage"


export const onLogin = (username, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/users?username=${username}&password=${password}`);
            if (res.data.length > 0) {
                // menyimpan data ke reducer
                let data = JSON.stringify(res.data[0])
                AsyncStorageLib.setItem("dataUser", data);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
                return { success: true }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const onKeepLogin = () => {
    return async (dispatch) => {
        try {
            let dataUser = await AsyncStorageLib.getItem("dataUser");
            dataUser = JSON.parse(dataUser)
            console.log("membaca data ari asyncStorage", dataUser)
            if (dataUser.id) {
                let res = await axios.get(`${API_URL}/users?id=${dataUser.id}`);
                console.log("keepLogin", res.data)
                if (res.data.length > 0) {
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data[0]
                    })

                    AsyncStorageLib.setItem("dataUser", JSON.stringify(res.data[0]));
                    return { success: true }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const onRegis = (username, email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/users`, {
                username,
                email,
                password,
                role: "user",
                status: "Active",
                cart: []
            });
            // if (res.data.length > 0) {
            return { success: true }
            // }
        } catch (error) {
            console.log(error)
        }
    }
}