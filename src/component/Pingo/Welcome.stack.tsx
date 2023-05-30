import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { Stack, StackNavigator } from "../../imports/Global.import";
import Home from "../../screens/Pingo/HomeScreen/Pingo.Home";
import PingoAgeFormScreen from "../../screens/Pingo/Pingo.AgeFormScreen";
import PingoNoPermissionScreen from "../../screens/Pingo/Pingo.NoPermissionScreen";
import PingoOtherPermissionScreen from "../../screens/Pingo/Pingo.OtherPermissionScreen";
import PingoOTPCodeScreen from "../../screens/Pingo/Pingo.OTPCodeScreen";
import PingoPermissionScreen from "../../screens/Pingo/Pingo.PermissionScreen";
import PingoPolicyScreen from "../../screens/Pingo/Pingo.PolicyScreen";
import PingoSignUpScreen from "../../screens/Pingo/Pingo.SignUpScreen";
import StackNavigatorScreenNameProvider from "../../services/StackScreenNameProvider";
import { ChildsContext } from "../../stores/childstores/ChildStore";
import { AuthContext } from "../FirebaseManagement/AuthProvider";
import { useNavigation } from "@react-navigation/native";
interface WelcomeStackProps {
    route:any
}

const WelcomeStack = ({route}: WelcomeStackProps) => {

    const { user } = React.useContext(AuthContext);

    const { isVisited } = route;
    
    return (
        <StackNavigator>
            {
                !user ?
                    (
                        <>
                            <Stack.Screen name={StackNavigatorScreenNameProvider.PingoSignup} children={
                                () => (
                                    <PingoSignUpScreen
                                        as={StackNavigatorScreenNameProvider.PingoSignup}
                                        params={{
                                            title: "Sign Up",
                                            linkText: "I already have account",
                                        }}
                                    />
                                )
                            } />
                            <Stack.Screen name={StackNavigatorScreenNameProvider.PingoSignin} children={
                                () => (
                                    <PingoSignUpScreen
                                        as={StackNavigatorScreenNameProvider.PingoSignin}
                                        params={{
                                            title: "Sign in",
                                            linkText: "Create a new account",
                                        }}
                                    />
                                )
                            } />
                        </>
                    ) : (
                        <>
                            {
                                (!isVisited || isVisited === undefined) &&
                                <>
                                    <Stack.Screen name={StackNavigatorScreenNameProvider.PolicyScreen} component={PingoPolicyScreen} />
                                    <Stack.Screen name={StackNavigatorScreenNameProvider.AgeFormScreen} component={PingoAgeFormScreen} />
                                    <Stack.Screen name={StackNavigatorScreenNameProvider.PermissionScreen} component={PingoPermissionScreen} />
                                    <Stack.Screen name={StackNavigatorScreenNameProvider.OTPCodeScreen} component={PingoOTPCodeScreen} />
                                    <Stack.Screen name={StackNavigatorScreenNameProvider.NoPermissionScreen} component={PingoNoPermissionScreen} />
                                    <Stack.Screen name={StackNavigatorScreenNameProvider.OtherPermissionScreen} component={PingoOtherPermissionScreen} />
                                </>
                            }
                        </>
                    )


            }
        </StackNavigator>
    )
}

export default WelcomeStack;