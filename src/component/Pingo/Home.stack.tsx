import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react-lite";
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
import WelcomeStack from "./Welcome.stack";

interface HomeStackProps {

}

const HomeStack = observer(({ route }: { route: any }) => {

    const { user } = React.useContext(AuthContext);
    const { OTPCode, storeEnterCode } = React.useContext(ChildsContext);
    const { isVisited, storeEnterCodeProps } = route.params;

    return (
        <Stack.Navigator
            screenOptions={({ navigation, route }) => ({ header: () => null, animationEnabled: true })}
        >
            {
                isVisited &&
                <Stack.Screen name={StackNavigatorScreenNameProvider.HomeScreen}
                    children={
                        () => (
                            <>
                                {
                                    <Home whenOTPCheck={OTPCode} />
                                }
                            </>
                        )
                    } />
            }
            {
                !isVisited &&
                <>
                    <Stack.Screen name={StackNavigatorScreenNameProvider.WelcomeStack}
                        children={
                            () => (
                                <>
                                    {
                                        <WelcomeStack route={isVisited} />
                                    }
                                </>
                            )
                        } />
                    <Stack.Screen name={StackNavigatorScreenNameProvider.HomeScreen} component={Home} />
                </>

            }

        </Stack.Navigator>
    )
})

export default HomeStack; 