import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { StackNavigatorScreenNameProvider } from "./src/services/StackScreenNameProvider";
import { Trunk } from './src/stores/useCoordinateStore';
import { UserTrunk } from './src/stores/userStore';
import { ChildsTrunk } from './src/stores/childstores/ChildStore';
import { Stack } from "./src/imports/Global.import";
import { ChildStack } from './src/component/Pingo/ChildStack/ChildStack';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import StoreWrapperContainer from "./src/component/common/StoreWrapperContainer"


/**
 *  1. Here we create the root node which named is App that implement the UserPermission
 * and handle the background notifications is useEfect hook.
 *  2. Rehydrate is the promise that init the mobx stores before used.
 *  3. Hide the SplashScreen.
 *  4. Used the Stack to create the Screen which helped us to switch from parent devices to child devices
 * for testing purpose only.
 *  5. ChooseDevices Stack , Parent Stack and Child Stack.
 *  
 */

function App() {

  const { Pingo } = StackNavigatorScreenNameProvider;

  const [isTrunk, setIsTrunck] = React.useState<boolean>(false);

  useEffect(() => {
    (
      async () => {
        await Trunk.init();
        await UserTrunk.init();
        await ChildsTrunk.init().then(() => setIsTrunck(true));
      }
    )()
    isTrunk && SplashScreen.hide();
  }, [isTrunk]);

  return (
    <StoreWrapperContainer>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Pingo}
          screenOptions={({ navigation, route }) => ({ header: () => null })}>
          <Stack.Screen name={Pingo} component={ChildStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreWrapperContainer>

  );
}

export default App;
