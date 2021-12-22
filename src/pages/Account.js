import React, { useState } from 'react';
import { Alert, View, KeyboardAvoidingView } from 'react-native';
import { Avatar, Button, Icon, Input, ListItem, Overlay, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import { updateUserPhoto, updateUserData } from "../actions"

const Account = (props) => {

    const dispatch = useDispatch();
    // const [gambar, setGambar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsdD1rK4ZtCJVizS00LaWifgJnY-wzSVBoHw&usqp=CAU")

    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(true);
    const [btnEdit, setBtnEdit] = useState("Edit");
    const [btnEditType, setBtnEditType] = useState("outline");

    const { iduser, username, email, password, role, status, photo } = useSelector((state) => {
        return {
            iduser: state.userReducer.id,
            username: state.userReducer.username,
            email: state.userReducer.email,
            password: state.userReducer.password,
            role: state.userReducer.role,
            status: state.userReducer.status,
            photo: state.userReducer.photo
        }
    })

    const [data, setData] = useState({
        username,
        email,
        password
    })

    const onBtImage = async (type) => {
        try {
            let image;
            if (type == "gallery") {
                image = await ImageCropPicker.openPicker({
                    width: wp(40),
                    height: wp(40),
                    cropping: true,
                    mediaType: 'photo'
                })
            } else if (type == "camera") {
                image = await ImageCropPicker.openCamera({
                    width: wp(40),
                    height: wp(40),
                    cropping: true,
                    mediaType: 'photo'
                })
            }

            if (image.path) {
                let res = await dispatch(updateUserPhoto(image.path, iduser))
                if (res.success) {
                    setVisible(!visible)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onBtEdit = () => {
        setEdit(!edit)
        setData({
            ...data, username, email, password
        })
        if (!edit) {
            setBtnEdit("Edit")
            setBtnEditType("outline")
        } else {
            setBtnEdit("Cancel")
            setBtnEditType("solid")
        }
    }

    const onBtSave = async () => {
        let res = await dispatch(updateUserData(data, iduser));
        if (res.success) {
            Alert.alert("Success ✅", "Edit data successfully")
            setEdit(!edit)
            setBtnEdit("Edit")
            setBtnEditType("outline")
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <ListItem containerStyle={{ width: wp(65) }} onPress={() => onBtImage("gallery")}>
                    <Icon name="folder" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Select from Gallery</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem containerStyle={{ width: wp(65) }} onPress={() => onBtImage("camera")}>
                    <Icon name="camera" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Open Camera</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </Overlay>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={hp(20)}>
                <Avatar
                    containerStyle={{ alignSelf: "center", marginTop: 16 }}
                    rounded
                    size="xlarge"
                    source={{ uri: photo }}
                >
                    <Avatar.Accessory
                        name="edit"
                        type="feather"
                        size={40}
                        iconStyle={{ fontSize: 20 }}
                        onPress={() => setVisible(!visible)}
                    />
                </Avatar>
                <View style={{ paddingHorizontal: wp(10), paddingTop: hp(5) }}>
                    <Input
                        containerStyle={{ backgroundColor: "#dcdde1", paddingHorizontal: 8, paddingTop: 8, borderRadius: 10 }}
                        label="Username"
                        labelStyle={{ color: "gray", fontWeight: "100", fontSize: 12 }}
                        value={data.username}
                        inputStyle={{ padding: 0 }}
                        disabled={edit}
                        onChangeText={(text) => setData({ ...data, username: text })}
                    />
                    <Input
                        containerStyle={{ marginTop: hp(2), backgroundColor: "#dcdde1", paddingHorizontal: 8, paddingTop: 8, borderRadius: 10 }}
                        label="Email"
                        labelStyle={{ color: "gray", fontWeight: "100", fontSize: 12 }}
                        value={data.email}
                        inputStyle={{ padding: 0 }}
                        disabled={edit}
                        onChangeText={(text) => setData({ ...data, email: text })}
                    />
                    <Input
                        containerStyle={{ marginTop: hp(2), backgroundColor: "#dcdde1", paddingHorizontal: 8, paddingTop: 8, borderRadius: 10 }}
                        label="Password"
                        labelStyle={{ color: "gray", fontWeight: "100", fontSize: 12 }}
                        value={data.password}
                        inputStyle={{ padding: 0 }}
                        secureTextEntry
                        disabled={edit}
                        onChangeText={(text) => setData({ ...data, password: text })}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <Button
                            containerStyle={{ marginVertical: hp(3), width: wp(30) }}
                            title={btnEdit}
                            type="outline"
                            onPress={onBtEdit}
                        />
                        <Button
                            containerStyle={{ marginVertical: hp(3), width: wp(30) }}
                            title="Save"
                            disabled={edit}
                            onPress={onBtSave}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Account;