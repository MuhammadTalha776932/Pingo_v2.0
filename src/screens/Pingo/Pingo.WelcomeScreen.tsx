import * as React from "react";
import {StyleSheet, View} from "react-native";
import BackgroundImage from "../../component/Utils/BackgroundImage";
import BottomButtonWithLink from "../../component/Utils/BottomButtonWithLink";
import { _Global_Images } from "../../imports/Image.import";

const PingoWelcomeScreen = () =>{
    return (
        <React.Fragment>
            <View style={styles.container}>
            <BackgroundImage imageUrl={_Global_Images.PingoWelcome_ScreenImage} opacity={1}/>
            <BottomButtonWithLink buttonText="Let's go!" linkText="We're going to set up your phone now"/>
            </View>
        </React.Fragment>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});

export default PingoWelcomeScreen