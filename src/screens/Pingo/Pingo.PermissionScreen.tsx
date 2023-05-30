import * as React from "react";
import { StyleSheet, View, useWindowDimensions, TouchableOpacity, PermissionsAndroid } from "react-native";
import { Text } from "react-native-paper";
import BackgroundImage from "../../component/Utils/BackgroundImage";
import PermissionScreenData from "../../data/PermissionScreen.data";
import { useNavigation } from "@react-navigation/native";
import { _Global_Images } from "../../imports/Image.import";
import StackNavigatorScreenNameProvider from "../../services/StackScreenNameProvider";

interface PingoPermissionScreenProps {
    imageUrl?: string,
    title?:string,
    subTitle?:string,
    buttonText?:string,
}

const PingoPermissionScreen = (props: PingoPermissionScreenProps) => {

    const { width, height } = useWindowDimensions()

    const navigation = useNavigation();

    const [isGranted,setIsGranted] = React.useState<boolean>(false);

    const handleGeolocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setIsGranted(true);
                navigation.navigate(StackNavigatorScreenNameProvider.OtherPermissionScreen as never);
            } else if(granted === PermissionsAndroid.RESULTS.DENIED)  {
                console.log('Location permission denied');
                setIsGranted(false);
            }
        } catch (err) {
            console.warn(err);
        }
    }

    React.useEffect(()=>{

    },[isGranted])

    const PermissionScreenStyle = StyleSheet.create({
        container: {
            flex: 1,
        },
        textContainer: {
            position: "absolute",
            top: height * 5 / 12,
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
    return (
        <React.Fragment>
            <View style={PermissionScreenStyle.container}>
                <BackgroundImage imageUrl={_Global_Images.PingoPermissionBGImage} opacity={1} />
            </View>
            <View style={PermissionScreenStyle.textContainer}>
                <Text style={PermissionScreenStyle.textTitle}>{PermissionScreenData.title}</Text>
                <Text style={PermissionScreenStyle.subTitle}>{PermissionScreenData.subTitle}</Text>
            </View>
            <TouchableOpacity
                style={[PermissionScreenStyle.button, PermissionScreenStyle.buttonChecked]}
                onPress={()=>{
                    handleGeolocationPermission();
                }}
            >
                <Text style={PermissionScreenStyle.buttonText}>{PermissionScreenData.buttonText}</Text>
            </TouchableOpacity>
        </React.Fragment>
    )
}

export default PingoPermissionScreen