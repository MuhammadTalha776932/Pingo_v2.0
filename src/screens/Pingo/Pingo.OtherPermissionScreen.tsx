import * as React from "react";
import { StyleSheet, View, useWindowDimensions, TouchableOpacity,Linking } from "react-native";
import { Text } from "react-native-paper";
import BackgroundImage from "../../component/Utils/BackgroundImage";
import { _Global_Images } from "../../imports/Image.import";
import OtherPermissionScreenData from "../../data/OtherPermissionScreen.data";
import {useNavigation} from "@react-navigation/native"
import StackNavigatorScreenNameProvider from "../../services/StackScreenNameProvider";

const PingoOtherPermissionScreen = () => {

    const {navigate} = useNavigation();

    const { width, height } = useWindowDimensions()

    const OtherPermissionScreenStyle = StyleSheet.create({
        container: {
            flex: 1,
        },
        textContainer: {
            position: "absolute",
            top: height * 5.5 / 12,
            marginHorizontal: 20,

        },
        textTitle: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 20,
        },
        subTitle: {
            color: "#63788B"
        },
        button: {
            width: width - 36,
            height: 50,
            backgroundColor: '#E0E8F0',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginHorizontal: 20,
            marginVertical: 20,
        },
        buttonChecked: {
            backgroundColor: '#0084FD',
        },
        buttonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
        },
    })

    const handleTheSettings = () => {
        Linking.openSettings()
    }

    return (
        <React.Fragment>
            <View style={OtherPermissionScreenStyle.container}>
                <BackgroundImage imageUrl={_Global_Images.PingoOtherPermissionBGImage} opacity={1} />
            </View>
            <View style={OtherPermissionScreenStyle.textContainer}>
                <Text style={OtherPermissionScreenStyle.textTitle}>{OtherPermissionScreenData.title}</Text>
                <Text style={OtherPermissionScreenStyle.subTitle}>{OtherPermissionScreenData.subTitle}</Text>
            </View>
            <TouchableOpacity
                style={[OtherPermissionScreenStyle.button, OtherPermissionScreenStyle.buttonChecked]}
                onPress={()=>{
                    handleTheSettings()
                    navigate(StackNavigatorScreenNameProvider.OTPCodeScreen as never);
                }}
            >
                <Text style={OtherPermissionScreenStyle.buttonText}>{OtherPermissionScreenData.buttonText}</Text>
            </TouchableOpacity>
        </React.Fragment>
    )
}

export default PingoOtherPermissionScreen