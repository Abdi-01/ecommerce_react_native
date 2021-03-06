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
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
                await AsyncStorageLib.setItem("dataUser", data);
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

                    await AsyncStorageLib.setItem("dataUser", JSON.stringify(res.data[0]));
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
                photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsdD1rK4ZtCJVizS00LaWifgJnY-wzSVBoHw&usqp=CAU",
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

export const updateUserCart = (data, iduser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/users/${iduser}`, {
                cart: data
            })

            console.log(res.data)

            dispatch({
                type: "UPDATE_CART",
                payload: res.data.cart
            })

            return { success: true }
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateUserPhoto = (image, iduser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/users/${iduser}`, {
                photo: image
            })

            dispatch({
                type: "UPDATE_PHOTO",
                payload: res.data.photo
            })

            return { success: true };

        } catch (error) {
            console.log(error);
        }
    }
}

export const updateUserData = (data, iduser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/users/${iduser}`, {
                ...data
            })

            dispatch({
                type: "UPDATE_DATA",
                payload: res.data
            })

            return { success: true };

        } catch (error) {
            console.log(error);
        }
    }
}

export const onLogout = () => {
    return async (dispatch) => {
        await AsyncStorageLib.removeItem('dataUser')
        dispatch({ type: "LOGOUT" })
    }
}