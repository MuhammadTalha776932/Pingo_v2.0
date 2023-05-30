import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Checkbox } from "react-native-paper";
import BackgroundImage from "../../component/Utils/BackgroundImage";
import { _Global_Images } from "../../imports/Image.import";
import {useNavigation} from "@react-navigation/native"
import StackNavigatorScreenNameProvider from "../../services/StackScreenNameProvider";

const PingoPolicyScreen = () => {
    const [isChecked, setIsChecked] = React.useState<'checked' | 'unchecked' | 'indeterminate'>("unchecked");
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();

    const BottomComponentStyle = StyleSheet.create({
        container: {
            // flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 16,
            height: height * 3/8,
            borderRadius:50,
            marginHorizontal:20,
        },
        text: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 16,
            // marginVertical:20,
        },
        checkboxContainer: {
            flexDirection: 'row',
            justifyContent:"center",
            alignItems: 'center',
            alignSelf:"center",
            marginBottom: 16,
            marginHorizontal:25,
            marginVertical:20,
        },
        checkboxText: {
            fontSize: 14,
            // marginLeft: 16,
            color: "#2F3846",
        },
        button: {
            width: width - 36,
            height: 50,
            backgroundColor: '#E0E8F0',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
        },
        buttonChecked: {
            backgroundColor: '#0084FD',
        },
        buttonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
        },
        LinkStyle: {
            color: "#2793F7"
        }
    });

    const handleNavigation = () =>{
        navigation.navigate(StackNavigatorScreenNameProvider.AgeFormScreen as never);
    }

    return (
        <React.Fragment>
            <View style={styles.container}>
                <BackgroundImage imageUrl={_Global_Images.PingoPolicyScreenImage} opacity={1} />
            </View>
            <View style={BottomComponentStyle.container}>
                <Text style={BottomComponentStyle.text}>Call your parent, they need to accept the terms and policies</Text>
                <View style={BottomComponentStyle.checkboxContainer}>
                    <Checkbox uncheckedColor={isChecked === "checked"? "#0084FD" : undefined } status={isChecked} 
                    onPress={()=>{

                        if(isChecked !== "checked") setIsChecked("checked")
                        if(isChecked !== "unchecked") setIsChecked("unchecked")
                        // setIsChecked("checked");
                    }}
                    />
                    <Text style={BottomComponentStyle.checkboxText}>
                        I confirm that I am the parent of the child. I accept <Text style={BottomComponentStyle.LinkStyle}> terms of use </Text> and <Text style={BottomComponentStyle.LinkStyle}>
                            privacy policy
                        </Text>
                    </Text>
                </View>
                <TouchableOpacity
                    style={[BottomComponentStyle.button, isChecked === "checked" ? BottomComponentStyle.buttonChecked : null]}
                    disabled={(isChecked === "unchecked" ? true : false)}
                    onPress={handleNavigation}
                >
                    <Text style={BottomComponentStyle.buttonText}>Got it</Text>
                </TouchableOpacity>
            </View>
            {/* <BottomButtonWithLink buttonText="Got it" linkText="I confirm that I am the parent of the child. I accept terms of use and privacy policy"/> */}
        </React.Fragment>
    )
};



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default PingoPolicyScreen