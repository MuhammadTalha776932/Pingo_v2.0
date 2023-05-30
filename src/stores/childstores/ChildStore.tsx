import { observable, action, makeObservable } from 'mobx';
import { createContext } from 'react';
import { AsyncTrunk } from "mobx-sync"
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * ChildStore is class based mobx store that have the properties and method
 */

class ChildStore {
    parents: any = {};                                       // store the parents single parent documents ... in future will change to handle array of parents

    childInformation: any = {}

    childAge: string = ""

    OTPCode: boolean = false;                              // too store the isPaired value comming from parent collection isPaired 

    storeEnterCode: string = ""                             // too store the child's devices enter code mean parents generated code.

    storeParentCoe: string = ""                              // too store the parent's res documents code;

    constructor() {
        makeObservable(this, {
            childAge: observable,
            parents: observable,
            OTPCode: observable,
            storeEnterCode: observable,
            storeParentCoe: observable,
            childInformation: observable,
            updateChild: action,
            setIsPaired: action,
            setPairingCode: action,
            setParentCodeIntoStore: action,
            setChildInfomation: action,
            setChildAge: action
        })

        this.getTheLocalStorageOTPStatus();
        this.getTheStoreEnterCodeFromLocalStorage();
    }

    getTheStoreEnterCodeFromLocalStorage = async () => {
        let getCode = await AsyncStorage.getItem("LocalResponseCode");
        getCode && this.setPairingCode(JSON.parse(getCode))
        console.log(getCode);
    }

    getTheLocalStorageOTPStatus = async () => {
        let OTPStatus = await AsyncStorage.getItem("OTPStatus").then(OTPStatusInJson => typeof OTPStatusInJson === "string" && JSON.parse(OTPStatusInJson))
        this.setIsPaired(OTPStatus)
    }

    setChildAge = (ageProps: string) => this.childAge = ageProps

    setChildInfomation = (childState: any) => {
        this.childInformation = { ...this.childInformation, childState }
    }
    setParentCodeIntoStore = (parentCodeFromServer: string) => {
        this.storeParentCoe = parentCodeFromServer;
    }
    updateChild(newUser: any) {
        this.parents = { ...this.parents, newUser };
    }

    setPairingCode = (pairingCode: string) => this.storeEnterCode = pairingCode;


    setIsPaired = (pairState: boolean) => this.OTPCode = pairState;

}

const ChildStores = new ChildStore();
export const ChildsContext = createContext(ChildStores);

export const ChildsTrunk = new AsyncTrunk(ChildStore, {
    storage: AsyncStorage,
})

export const ChildsProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChildsContext.Provider value={ChildStores}>
            {
                children
            }
        </ChildsContext.Provider>
    )
}

export default ChildStores;