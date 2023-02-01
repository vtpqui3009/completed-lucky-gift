import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {IMAGE_URL} from "../constants/ImageUrl";
import {SPACING} from "../constants/Spacing";
import {COLORS} from "../constants/Colors";

import {useDispatch} from "react-redux";
import {logout} from "../store/userSlice";

import {useNavigation} from "@react-navigation/native";


const SettingScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const handleLogout = () => {
        dispatch(logout())
        navigation.navigate("HomeScreen")
    }
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headerContainer}>
                    <Image source={{uri: IMAGE_URL.myLove}} style={styles.avatar}/>
                    <Text style={styles.headerText}>Thái Thảo Vy</Text>
                    <Text style={[styles.headerText, styles.headerDescription]}>Bồ của Quí</Text>
                </View>
                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={handleLogout} style={styles.button}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SettingScreen;


const styles = StyleSheet.create({
    container: {
        paddingVertical: SPACING * 4,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: SPACING * 5,
        height: SPACING * 5,
        borderRadius: SPACING * 5,
        marginBottom: SPACING * 0.6
    },
    headerText: {
        lineHeight: SPACING * 2
    },
    headerDescription: {
        fontSize: SPACING * 1.2,
        color: 'gray'
    },
    footerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: SPACING * 5,
        borderRadius: SPACING / 2,
        width: SPACING * 7,
        height: SPACING * 3.5,
        backgroundColor: COLORS.primary,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    notAuthorizedContainer:
        {
            position: 'absolute',
            top: '0%',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
});
