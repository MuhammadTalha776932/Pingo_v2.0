import * as React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions,ImageResizeMode } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

interface BackgroundImageProps {
    imageUrl: any,
    opacity?: number,

    stylingProps?: StyleProps,
    resizeMode?: string,
}


const BackgroundImage = ({ imageUrl, opacity, resizeMode }: BackgroundImageProps) => {

    const { width, height } = useWindowDimensions();

    const [resizeModes,setresizeModes] = React.useState<ImageResizeMode>("cover")

    const styles = StyleSheet.create({
        ImageBackgroundStyling: {
            width: width,
            height: height,
            opacity: opacity || 0.1,
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        }
    });
    return (
        <React.Fragment>
            <Image
                source={imageUrl} resizeMode={resizeMode === "contain"? resizeMode : resizeModes } style={{
                    ...styles.ImageBackgroundStyling,
                }}
            />
        </React.Fragment>
    );
};

export default BackgroundImage; 


