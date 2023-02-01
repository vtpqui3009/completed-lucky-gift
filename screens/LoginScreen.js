import {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {AntDesign} from "@expo/vector-icons";
import axios from "axios";

import {SPACING} from "../constants/Spacing";
import {COLORS} from "../constants/Colors";
import AstronautLoading from "../components/UI/AstronautLoading";

import {useDispatch} from "react-redux";
import {login} from "../store/userSlice";

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isShowLoading, setIsShowLoading] = useState(false);
    
    const handleChangeEmail = (text) => {
        setEmail(text);
    }
    
    const handleChangePassword = (text) => {
        setPassword(text);
    }
    
    const handleShowPassword = () => {
        setIsShowPassword(state => !state);
    }
    
    const handleLogin = async () => {
        const payload = {
            email: email,
            password: password
        }
        return await axios.post('https://lucky-gift.vercel.app/api/user/login', payload).then(response => {
            setSuccessMessage(response.data.message);
            dispatch(login(response.data));
            setErrorMessage("");
            setTimeout(() => {
                setIsShowLoading(true);
            }, 500);
            setTimeout(() => {
                setIsShowLoading(false);
                navigation.navigate('HomeScreen');
            }, 1500);
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
            setSuccessMessage("");
        });
    }
    
    return <>
        <AstronautLoading isShowLoading={isShowLoading} message={successMessage}/>
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Welcome !</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={handleChangeEmail}
                value={email}
                placeholder="Enter your email"
            />
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChangePassword}
                    value={password}
                    placeholder="Enter your password"
                    secureTextEntry={!isShowPassword}
                />
                <TouchableOpacity style={styles.iconContainer} onPress={handleShowPassword}>
                    <AntDesign name="eyeo" size={20} color="black"/>
                </TouchableOpacity>
            </View>
            
            {errorMessage !== '' && <View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>}
            
            <TouchableOpacity style={styles.buttonAlt} onPress={handleLogin}>
                <Text style={styles.buttonAltText}>Log In</Text>
            </TouchableOpacity>
        </View>
    </>
    
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '45%',
        paddingVertical: SPACING * 2,
        paddingHorizontal: SPACING * 3,
        zIndex: 0
    },
    headerText: {
        fontSize: SPACING * 2.5,
        fontWeight: 'bold',
        color: COLORS.primary
    },
    input: {
        width: '100%',
        height: SPACING * 5,
        borderWidth: 1,
        borderColor: COLORS.fourth,
        marginVertical: SPACING * 2,
        fontSize: SPACING * 1.4,
        padding: SPACING
    },
    passwordInputContainer: {
        position: 'relative',
        width: '100%',
    },
    iconContainer: {
        position: 'absolute',
        right: '5%',
        top: '40%',
    },
    buttonAlt: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING * 1.3,
        paddingHorizontal: SPACING * 1.5,
        width: '100%',
        borderRadius: SPACING * 0.5,
        marginVertical: SPACING * 2,
    },
    buttonAltText: {
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: SPACING * 1.4
    },
    errorMessage: {
        color: COLORS.primary,
        fontWeight: 'bold',
        marginVertical: SPACING
    },
});
