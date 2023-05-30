export interface NoPermissionScreenProps  {
    imageUrl?:string,
    title?: string,
    subTitle?:string,
    buttonText?:string,
}

export const NoPermissionScreenData:NoPermissionScreenProps={
    title:"Can't understand where you are",
    subTitle:"Allow access to the location so parents don't worry about you.",
    buttonText:"Go to Setting"
}

export default NoPermissionScreenData