import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import * as React from 'react'

const BottomButton = () => {
    const { width, height } = useWindowDimensions();
    const [isChecked, setIsChecked] = React.useState<'checked' | 'unchecked' | 'indeterminate'>("unchecked");
    const styles = StyleSheet.create({
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
    })

    return (
        <React.Fragment>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, isChecked === "checked" ? styles.buttonChecked : null]}
                    disabled={(isChecked === "unchecked" ? true : false)}
                >
                    <Text style={styles.buttonText}>Got it</Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    )
}

export default BottomButton