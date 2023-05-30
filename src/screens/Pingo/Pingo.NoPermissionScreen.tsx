import * as React from "react";
import { StyleSheet, View, useWindowDimensions, TouchableOpacity,Linking } from "react-native";
import { Text } from "react-native-paper";
import BackgroundImage from "../../component/Utils/BackgroundImage";
import { _Global_Images } from "../../imports/Image.import";
import NoPermissionScreenData, { NoPermissionScreenProps } from "../../data/NoPermissionScreen.data";

const PingoNoPermissionScreen = (props: NoPermissionScreenProps ) => {

    const { width, height } = useWindowDimensions()

    const NoPermissionScreenStyle = StyleSheet.create({
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
            <View style={NoPermissionScreenStyle.container}>
                <BackgroundImage imageUrl={_Global_Images.PingoNoPermissionBGImage} opacity={1} />
            </View>
            <View style={NoPermissionScreenStyle.textContainer}>
                <Text style={NoPermissionScreenStyle.textTitle}>{NoPermissionScreenData.title}</Text>
                <Text style={NoPermissionScreenStyle.subTitle}>{NoPermissionScreenData.subTitle}</Text>
            </View>
            <TouchableOpacity
                style={[NoPermissionScreenStyle.button, NoPermissionScreenStyle.buttonChecked]}
                onPress={()=>{
                    handleTheSettings()
                }}
            >
                <Text style={NoPermissionScreenStyle.buttonText}>{NoPermissionScreenData.buttonText}</Text>
            </TouchableOpacity>
        </React.Fragment>
    )
}

export default PingoNoPermissionScreen