import {Image, StyleSheet, Text, View} from "react-native";
import {IMAGE_URL} from "../../constants/ImageUrl";
import {COLORS} from "../../constants/Colors";
const AstronautLoading = ({isShowLoading, message}) => {
    return <>
        {isShowLoading &&
            <View style={styles.loading}>
                <Image source={{uri: IMAGE_URL.astronautLoading}} style={{width: 200, height: 200}}/>
                <Text style={styles.loadingText}>{message}</Text>
            </View>}
    </>
}

export default AstronautLoading;

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        backgroundColor: 'gray',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        zIndex: 2
    },
    loadingText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 17
    }
});
