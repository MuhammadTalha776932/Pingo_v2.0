import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ColorThemes } from '../../styles/global.style';
import { useNavigation } from "@react-navigation/native"
import StackNavigatorScreenNameProvider from '../../services/StackScreenNameProvider';

interface BottomButtonWithLinkProps {
  buttonText: string,
  linkText: string,
  styling?: boolean,
  as?:string
}

const BottomButtonWithLink = ({ buttonText, linkText, styling }: BottomButtonWithLinkProps) => {

  const navigation = useNavigation();

  const styles = StyleSheet.create({
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
      color: ColorThemes.LinkTextColor,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: "bold",
      marginVertical: 14
    },
  });

  return (
    <React.Fragment>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styling ? { ...styles.text, } : { ...styles.text, color: "#fff" }}>
            {linkText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styling ? { ...styles.button, backgroundColor: ColorThemes.ButtonBackground, } : { ...styles.button, backgroundColor: "#fff", }}
          onPress={() => { navigation.navigate(StackNavigatorScreenNameProvider.HomeStack as never) }}>
          <Text style={styling ? { ...styles.buttonText, } : { ...styles.buttonText, color: ColorThemes.ButtonBackground }}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

export default BottomButtonWithLink;

