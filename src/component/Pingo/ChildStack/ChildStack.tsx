//#region Imports Libraries...
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../../FirebaseManagement/AuthProvider';
import auth from "@react-native-firebase/auth"
import { observer } from 'mobx-react';
import { ChildsContext} from '../../../stores/childstores/ChildStore';
import { Stack } from '../../../imports/Global.import';
import PingoWelcomeScreen from '../../../screens/Pingo/Pingo.WelcomeScreen';
import StackNavigatorScreenNameProvider from '../../../services/StackScreenNameProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStack from '../Home.stack';
//#endregion



export const ChildStack = observer((): JSX.Element => {

  const { user, setUser, Signout } = React.useContext(AuthContext);

  const [isVisited, setIsVisited] = React.useState(false);

  const { storeEnterCode, OTPCode } = React.useContext(ChildsContext);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
  }
  React.useEffect(() => {
    // requestLocationPermission();
    console.log("storeENter code",storeEnterCode)
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    (
      async () => {
        try {
          let isVisited = await AsyncStorage.getItem("isVisited").then(res => typeof res === "string" && JSON.parse(res));
          if (typeof isVisited === "boolean") { setIsVisited(isVisited); }
          console.log(`It's print from  HomeStack ${OTPCode}`)
        } catch (error: any) {
          console.error(`Error occurred in the app useeffect method ${error.message}`);
        }
      }
    )();

    return () => { unsubscribe() }
  }, [OTPCode])

  return (
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({ header: () => null, animationEnabled: true })}
        children={<>
          <Stack.Screen name={StackNavigatorScreenNameProvider.WelcomeScreen} component={PingoWelcomeScreen} />
          <Stack.Screen name={StackNavigatorScreenNameProvider.HomeStack} component={HomeStack} initialParams={{isVisited:isVisited, storeEnterCodeProps:storeEnterCode}}/>
        </>
        }
      />
  );
});

export default ChildStack;

const styles = StyleSheet.create({
  container: {}
});
