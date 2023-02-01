import React from "react";
import {SafeAreaView, Text, StyleSheet} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import {COLORS} from "./constants/Colors";

import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import GameScreen from "./screens/GameScreen";
import LoveScreen from "./screens/LoveScreen";
import SettingScreen from "./screens/SettingScreen";

import LoginScreen from "./screens/LoginScreen";

import {NavigationContainer} from "@react-navigation/native";

import {Provider} from "react-redux";
import {store, persistor} from "./store";
import {PersistGate} from 'redux-persist/integration/react'

import {useFonts} from "expo-font";


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


const BottomTabsOverview = () => {
    return (
        <BottomTabs.Navigator screenOptions={
            {
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 30,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 60,
                    ...styles.shadow
                },
            }
        }>
            <BottomTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarIcon: ({color, size}) => <AntDesign name="home" size={size} color={color}/>,
                }}
            />
            <BottomTabs.Screen
                name="HistoryScreen"
                component={HistoryScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarIcon: ({color, size}) => <MaterialIcons name="history" size={size} color={color}/>,
                }}
            />
            <BottomTabs.Screen
                name="GameScreen"
                component={GameScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarIcon: ({color, size}) => <AntDesign name="gift" size={size} color={color}/>,
                    tabBarStyle: {
                        display: 'none'
                    }
                }}
            />
            <BottomTabs.Screen
                name="LoveScreen"
                component={LoveScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarIcon: ({color, size}) => <AntDesign name="hearto" size={size} color={color}/>,
                    tabBarStyle: {
                        display: 'none'
                    }
                }}
            />
            <BottomTabs.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarIcon: ({color, size}) => <AntDesign name="setting" size={size} color={color}/>,
                }}
            />
        </BottomTabs.Navigator>
    
    );
};

export default function App() {
    const [fontsLoaded] = useFonts({
        'dancing-script-bold': require("./assets/fonts/DancingScript-Bold.ttf"),
        'dancing-script-medium': require("./assets/fonts/DancingScript-Medium.ttf"),
        'dancing-script-regular': require('./assets/fonts/DancingScript-Regular.ttf'),
        'dancing-script-semibold': require("./assets/fonts/DancingScript-SemiBold.ttf")
    })
    
    if (!fontsLoaded) {
        return null
    }
    
    return (
        <>
            <StatusBar style="auto"/>
                <SafeAreaView style={styles.container}>
                    <Provider store={store}>
                        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
                            <NavigationContainer>
                                <Stack.Navigator>
                                    <Stack.Screen name="BottomTabsOverview" component={BottomTabsOverview}
                                                  options={{headerShown: false}}/>
                                    <Stack.Screen name="Login" component={LoginScreen}
                                                  options={{headerShown: false}}/>
                                </Stack.Navigator>
                            </NavigationContainer>
                        </PersistGate>
                    </Provider>
                </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});
