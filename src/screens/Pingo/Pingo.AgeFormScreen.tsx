import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import {useNavigation} from "@react-navigation/native"
import { TextInput } from "react-native-paper";
import BackgroundImage from "../../component/Utils/BackgroundImage";
import { ChildsContext } from '../../stores/childstores/ChildStore';
import { _Global_Images } from "../../imports/Image.import";
import { observer } from "mobx-react";
import StackNavigatorScreenNameProvider from "../../services/StackScreenNameProvider";

const PingoAgeFormScreen = observer(() => {

    const navigation = useNavigation();

    const { setChildAge, childAge } = React.useContext(ChildsContext)
    const { width, height } = useWindowDimensions();

    const [age, setAge] = React.useState<string>("");

    const BottomComponentStyle = StyleSheet.create({
        container: {
            // flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 16,
            height: height * 3 / 8,
            borderRadius: 50,
            marginHorizontal: 20,
        },
        text: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 16,
            // marginVertical:20,
        },
        checkboxContainer: {
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',
            alignSelf: "center",
            marginBottom: 16,
            marginHorizontal: 25,
            marginVertical: 20,
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

    const TopComponentStyle = StyleSheet.create({
        container: {
            position: 'absolute',
            top: 50,
            left: 20,
            padding: 10,
            backgroundColor: 'white',
        },
        topLeft: {
            position: 'absolute',
            top: 50,
            left: 20,
            zIndex: 10
        },
        label: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        input: {
            width: width * 5 / 8,
            height: height * 1 / 18,
            backgroundColor: "#fff",
            elevation: 5,
            marginVertical: 20,
        },
    })

    React.useEffect(() => {
        if (TextInput.defaultProps) {
            TextInput.defaultProps.cursorColor = "#0085FF"
        }
    }, [])

    return (
        <React.Fragment>
            <View style={styles.container}>
                <BackgroundImage imageUrl={_Global_Images.PingoAgeScreenBGImage} opacity={1}  />
            </View>
            <View style={TopComponentStyle.topLeft}>
                <Text style={TopComponentStyle.label}>How old are you?</Text>
                <TextInput
                    textContentType={"none"}
                    onChangeText={(text: string) => {
                        const formattedText = text.replace(/[^0-9]/g, '');
                        setAge(formattedText);
                    }}
                    style={TopComponentStyle.input}
                    cursorColor={"#0085FF"}
                    underlineStyle={{ display: "none" }}
                    keyboardType="numeric"
                    pointerEvents="box-only"
                    maxLength={2}
                />
            </View>

            <View style={BottomComponentStyle.container}>
                <TouchableOpacity
                    style={[BottomComponentStyle.button, age?.length > 0 ? BottomComponentStyle.buttonChecked : null]}
                    disabled={(age?.length > 0 ? false : true)}
                    onPress={() => {
                        if (age.length > 0) { 
                            setChildAge(age)
                            navigation.navigate(StackNavigatorScreenNameProvider.PermissionScreen as  never);
                         }
                    }}
                >
                    <Text style={BottomComponentStyle.buttonText}>Got it</Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    )
});



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default PingoAgeFormScreen