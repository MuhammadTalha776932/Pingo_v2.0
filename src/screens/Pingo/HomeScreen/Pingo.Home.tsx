import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { AuthContext } from '../../../component/FirebaseManagement/AuthProvider';
import { closedTheBackgroundTask, handleBackground } from '../../../component/Pingo/BackGroundTask/GeolocationTask';
import BottomModals from '../../../component/Pingo/BottomModals';
import RNRestart from "react-native-restart"
import { ChildsContext } from '../../../stores/childstores/ChildStore';
import { sendPostRequest } from '../../../Helper/SendToServer';
import backgroundServer from 'react-native-background-actions';
import { observer } from 'mobx-react';

export const Home = observer(({ whenOTPCheck }: { whenOTPCheck?: boolean }) => {
  const { Signout, user } = React.useContext(AuthContext);
  const { setIsPaired,storeEnterCode } = React.useContext(ChildsContext);

  React.useLayoutEffect(() => {
    (
      async () => {
        try {
          await AsyncStorage.setItem("isVisited", JSON.stringify(true));
        } catch (error: any) {
          console.error(`Error occurred in the app useeffect method ${error.message}`);
        }
      }
    )();
    console.log(`Print the store OTP Code  ==> ${whenOTPCheck}`);
    if (whenOTPCheck) sendPostRequest(user, "Child", storeEnterCode);
    if ((whenOTPCheck) && !(backgroundServer.isRunning())) handleBackground();
  }, [whenOTPCheck])

  return (
    <View style={styles.container}>
      <View style={{ ...styles.TooltipStyle }}>
        <Chip icon="cancel"
          mode='outlined'
          onPress={() => {
            closedTheBackgroundTask()
            // const storeTheOTPStatusToLocalStorage = async () => {
            //   await AsyncStorage.setItem("OTPStatus",JSON.stringify(whenOTPCheck))
            // }
            // storeTheOTPStatusToLocalStorage();
          }}>Want to stop background process?</Chip>
      </View>
      <View style={{ ...styles.TooltipStyle, marginTop: "10%" }}>
        <Chip icon="cancel"
          mode='outlined'
          onPress={() => {
            (
              async () => {
                try {
                  await AsyncStorage.removeItem("isVisited");
                } catch (error: any) {
                  console.error(`Error occurred in the app useeffect method ${error.message}`);
                }
              }
            )();
            Signout();
            setIsPaired(false);
            RNRestart.Restart();
          }}>SignOut</Chip>
      </View>
      <BottomModals />
    </View>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  TooltipStyle: {
    position: "absolute",
    top: 0,
    bottom: 'auto',
    left: "25%",
  }
});
