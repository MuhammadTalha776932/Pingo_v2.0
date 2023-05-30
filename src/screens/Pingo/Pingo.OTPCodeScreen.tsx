import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import OTPInputView from "@twotalltotems/react-native-otp-input"
import BackgroundImage from "../../component/Utils/BackgroundImage";
import { _Global_Images } from "../../imports/Image.import";
import OTPCodeScreenData from "../../data/OTPCodeScreen.data";
import { useNavigation } from "@react-navigation/native";
import StackNavigatorScreenNameProvider from "../../services/StackScreenNameProvider";
import axios from "axios";
import { ChildsContext } from "../../stores/childstores/ChildStore";
import { Alert } from "react-native";
import { observer } from "mobx-react";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface OTPCodeScreenProps {

}

const PingoOTPCodeScreen = observer(() => {

    const [otpCode, setOtpCode] = React.useState('');
    const [isCorrect, setISCorrect] = React.useState<boolean>(false);

    const { setPairingCode, setIsPaired, } = React.useContext(ChildsContext);

    const navigation = useNavigation();

    const handleOtpCodeChange = (code: string): void => {
        setOtpCode(code);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            //   justifyContent: 'center',
            //   alignItems: 'center',
            backgroundColor: '#f2f2f2',
        },
        subContainer: {
            marginVertical: 20,
            marginHorizontal: 20
        },
        text: {
            fontSize: 20,
            fontWeight: 'bold',
            color: "#2F3846",
            //   textAlign: 'center',
        },
        otpInput: {
            width: '80%',
            height: 100,
            marginBottom: 10,
        },
        otpInputField: {
            borderRadius: 20,
            borderWidth: 1,
            // borderColor: '#ccc',
            borderColor: "#90ee90",
            fontSize: 16,
            color: '#000',
            height: 60,
            backgroundColor: "#fff",
            elevation: 3,
        },
        otpInputHighlight: {
            borderColor: 'blue',
        },
        optInputHighlightSuccessful: {
            borderRadius: 20,
            borderWidth: 1,
            // borderColor: '#ccc',
            borderColor: "#90ee90",
            fontSize: 16,
            color: '#000',
            height: 60,
            backgroundColor: "#fff",
            elevation: 3,
        },
        optInputHighlightFail: {
            borderRadius: 20,
            borderWidth: 1,
            fontSize: 16,
            color: '#000',
            height: 60,
            backgroundColor: "#fff",
            elevation: 3,
            borderColor: "#Ffcccb"
        },
        button: {
            backgroundColor: '#007bff',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        linkButton: {
        },
        linkButtonText: {
            color: '#0085FF',
            fontSize: 16,
            fontWeight: 'bold',
            // textDecorationLine: 'underline',
        },
    });

    React.useEffect(() => {
        isCorrect && navigation.navigate(StackNavigatorScreenNameProvider.HomeScreen as never);
    }, [isCorrect])

    return (
        <React.Fragment>
            <View style={styles.container}>
                <BackgroundImage imageUrl={_Global_Images.PingoOTPCodeScreenBGImage} opacity={1} />
                <View style={styles.subContainer}>
                    <Text style={styles.text}>{OTPCodeScreenData.title}</Text>
                    <OTPInputView
                        style={styles.otpInput}
                        pinCount={6}
                        onCodeChanged={handleOtpCodeChange}
                        keyboardType={"default"}
                        autoFocusOnLoad
                        codeInputFieldStyle={(isCorrect && otpCode.length > 0) ? styles.optInputHighlightSuccessful : styles.optInputHighlightFail}
                        codeInputHighlightStyle={(isCorrect && otpCode.length > 0) ? { borderColor: "#90ee90" } : { borderColor: "#Ffcccb" }}
                        onCodeFilled={(code) => {
                            (
                                async () => {
                                    axios.post("https://findmykids.cyclic.app/code", { data: { code } }, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    })
                                        .then((response) => {
                                            let pairState = response.data.isCorrect;
                                            const storeTheOTPStatusToLocalStorage = async () => {
                                                await AsyncStorage.setItem("OTPStatus",JSON.stringify(pairState))
                                              }
                                              storeTheOTPStatusToLocalStorage();
                                            setIsPaired(pairState)
                                            if (response.data.isCorrect) {
                                                console.log(`Here we set the response code to child setPairingCode ${response.data.code}`)
                                                const setTheResponseCodeToLocalStorage = async(Code:string) =>{
                                                    await AsyncStorage.setItem("LocalResponseCode", JSON.stringify(Code))
                                                }
                                                setTheResponseCodeToLocalStorage(response.data.code);
                                                setPairingCode(response.data.code);
                                            }
                                            else {
                                                Alert.alert("Code is invalid");
                                            }
                                            console.log(response.data.isCorrect)
                                            setISCorrect(response.data.isCorrect)
                                        })
                                }
                            )()
                        }}
                    />
                    <TouchableOpacity style={styles.linkButton}>
                        <Text style={styles.linkButtonText}>{OTPCodeScreenData.linkText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )
})

export default PingoOTPCodeScreen;