

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { ChildsProvider } from "../../stores/childstores/ChildStore";
import { UserProvider } from '../../stores/userStore';
import { AuthProvider } from '../FirebaseManagement/AuthProvider';


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

interface IStoreWrapperContainer {
    children: React.ReactNode
}


const StoreWrapperContainer = ({ children }: IStoreWrapperContainer): JSX.Element => {
    return (
        <AuthProvider>
            <PaperProvider>
                <UserProvider>
                    <ChildsProvider>
                        {
                            children
                        }
                    </ChildsProvider>
                </UserProvider>
            </PaperProvider>
        </AuthProvider>
    );
}

export default StoreWrapperContainer;
