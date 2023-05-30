import { NoPermissionScreenProps } from "./NoPermissionScreen.data"


type OTPCodeScreenProps = NoPermissionScreenProps & {linkText:string};

export const OTPCodeScreenData: OTPCodeScreenProps ={
    title:"Now Enter the code, it's in parent's app",
    linkText:"Where is the Code?",
}

export default OTPCodeScreenData;