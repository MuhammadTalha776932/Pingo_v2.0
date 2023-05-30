import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../component/FirebaseManagement/AuthProvider';
import StackNavigatorScreenNameProvider from '../../services/StackScreenNameProvider';
import { useNavigation } from '@react-navigation/native';
import { ColorThemes } from '../../styles/global.style';
import BackgroundImage from '../../component/Utils/BackgroundImage';
import { _Global_Images } from '../../imports/Image.import';


interface PingoSignUpScreen {
    as?: string
    params?: {
        title:string,
        linkText:string
    }
}

const PingoSignUpScreen = ({ as, params }: PingoSignUpScreen) => {

    const navigation = useNavigation();

    const { Signup, Signin,user} = React.useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView style={styles.mainContainer}>
            <BackgroundImage imageUrl={_Global_Images.BackgroundImage} opacity={0.3}/>
            <Text style={styles.mainHeader}>
                {
                    params?.title
                }
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="gray"
                    placeholder="Email"
                    style={styles.inputStyle}
                    autoCorrect={false}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholderTextColor="gray"
                    placeholder="Password"
                    style={styles.inputStyle}
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>

            {/* Footer */}
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    if (params?.linkText.includes("I already have account")) {navigation.navigate(StackNavigatorScreenNameProvider.PingoSignin as never)}
                    if (params?.linkText.includes("Create a new account")) {navigation.navigate(StackNavigatorScreenNameProvider.PingoSignup as never)}
                }}>
                    <Text style={{ ...styles.text, }}>
                        {
                            params?.linkText
                        }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{ ...styles.button, backgroundColor: "#fff", }}
                    onPress={() => {
                        if (as === StackNavigatorScreenNameProvider.PingoSignup && (email.length !== 0 && password.length !== 0)) {
                            Signup(email, password);
                        }
                        if (as === StackNavigatorScreenNameProvider.PingoSignin && (email.length !== 0 && password.length !== 0)) { 
                            Signin(email, password); 
                            user && navigation.navigate(StackNavigatorScreenNameProvider.PolicyScreen as never)
                        }
                    }}>
                    <Text style={{ ...styles.buttonText, color: ColorThemes.ButtonBackground }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 30,
        alignItems: 'center',
    },
    mainHeader: {
        fontSize: 20,
        color: '#344055',
        fontWeight: '800',
        paddingTop: 20,
    },
    inputContainer: {
        marginTop: 15,
        width: '95%',
    },
    inputStyle: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: 'gray',
        marginBottom: 10,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#0085FF",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        padding: 16,
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        color: ColorThemes.white,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold",
        marginVertical: 14
    },
});
export default PingoSignUpScreen;
