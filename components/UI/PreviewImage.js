import {View, StyleSheet, Image, TouchableOpacity, Text} from "react-native";
import {IMAGE_URL} from "../../constants/ImageUrl";
import GestureRecognizer from 'react-native-swipe-gestures';

const PreviewImage = ({imageUrl, handleClosePreviewImage, onSwipeLeft, onSwipeRight, currentImageIndex, totalImage}) => {

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };


    return <View style={styles.container}>
            <TouchableOpacity style={styles.timesIconContainer} onPress={handleClosePreviewImage}>
                <Image source={{uri: IMAGE_URL.timesIcon}} style={styles.icon}/>
            </TouchableOpacity>
        <GestureRecognizer
            onSwipeLeft={() => onSwipeLeft(imageUrl)}
            onSwipeRight={() => onSwipeRight(imageUrl)}
            config={config}
            style={styles.imageContainer}
        >
            <Image source={{uri: imageUrl}} resizeMode="cover" style={styles.image}/>
        </GestureRecognizer>
        <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>{currentImageIndex} / {totalImage}</Text>
        </View>
    </View>
}

export default  PreviewImage;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        zIndex: 100
    },
    timesIconContainer: {
        position: 'absolute',
        top: '3%',
        right: '3%',
        zIndex: 101
    },
    icon: {
        width: 30,
        height: 30,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        minHeight: '80%',
        height: 'auto',
    },
    footerTextContainer: {
        position: "absolute",
        bottom: '5%',
        left: '50%'
    },
    footerText: {
        color:"white",
        fontWeight: 'bold'
    }
})
