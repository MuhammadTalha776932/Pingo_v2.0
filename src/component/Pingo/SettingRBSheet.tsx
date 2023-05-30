import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Switch } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { PingoSettingScreenData } from '../../data/PingoSettingScreen.data';

export const SettingRBSheet = () => {
    const refRBSheet = React.useRef<RBSheet | null>(null);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    let { width, height } = useWindowDimensions()
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <SafeAreaView>
            <Text onPress={() => refRBSheet.current?.open()} style={styles.title}>
                Safety
            </Text>
            <RBSheet
                ref={refRBSheet}
                height={height - 100}
                openDuration={250}
                closeDuration={200}
                closeOnDragDown={true}
                dragFromTopOnly={true}
                closeOnPressMask={true}
                closeOnPressBack={true}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                    draggableIcon: {
                        backgroundColor: "#DCE0E3",
                        width: width * 2 / 12,
                    }
                }}
            >
                <ScrollView style={styles.container}>
                    {
                        PingoSettingScreenData.map((settingContent, index) => (
                            <React.Fragment key={settingContent.title}>
                                <View style={styles.RowContainer}>
                                    <View style={styles.topRow}>
                                        <Text style={styles.title}>{settingContent.title}</Text>
                                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                                    </View>
                                    <Text style={styles.description}>
                                        {settingContent.subTitle}
                                    </Text>
                                </View>
                                <Divider bold />
                            </React.Fragment>
                        ))
                    }
                </ScrollView>
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    RowContainer: {
        marginVertical: 20,
        paddingVertical: 5,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 16,
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginTop: 6,
        marginHorizontal: 16,
    },
});

export default SettingRBSheet;
