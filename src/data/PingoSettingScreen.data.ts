interface IPingoSettingScreenProps {
    id:number
    title:string
    subTitle:string
}

export const PingoSettingScreenData:IPingoSettingScreenProps[] =[
    {
        id:Math.floor(Math.random() * 100),
        title:"Listen to what's going on around",
        subTitle:"Parents can listen to your surroundings to make sure you're safe."
    },
    {
        id:Math.floor(Math.random() * 100),
        title:"See the app statistics",
        subTitle:"Parents will see how much time you spend in apps. But they won't know what websites you are using, what you are watching and can't read your messages."
    },
]
