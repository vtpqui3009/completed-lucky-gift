import {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {SPACING} from "../constants/Spacing";
import {COLORS} from "../constants/Colors";
import {IMAGE_URL} from "../constants/ImageUrl";

import {useNavigation} from '@react-navigation/native';

import {useSelector} from "react-redux";

import format24h from "../utils/format24h";
import countDate from "../utils/countDate";

import {MEMORIES_DATA} from "../DATA/MemoriesData";
import {FlatGrid} from "react-native-super-grid";

import PreviewImage from "../components/UI/PreviewImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
    const navigation = useNavigation();
    const {currentUser} = useSelector((state) => state.user);
    const [greeting, setGreeting] = useState("");
    const [lovingDateMessage, setLovingDateMessage] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [isVisiblePreviewImage, setIsVisiblePreviewImage] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [totalImage, setTotalImage] = useState(0);

    useEffect(() => {
        if (!currentUser) {
            navigation.navigate("Login");
        }
        const message = format24h();
        setGreeting(message);
        setLovingDateMessage(countDate());
        
    }, [currentUser]);
    const handleLogin = () => {
        navigation.navigate("Login");
    };

    const handlePressImage = (images, selectedImage) => {
        navigation.setOptions({
            tabBarStyle: {
                display: 'none'
            }
        })
        const imageIndex = images.findIndex(image => image == selectedImage);
        setImageUrls(images);
        setTotalImage(images.length);
        setCurrentImageIndex(imageIndex + 1);
        setImageUrl(selectedImage)
        setIsVisiblePreviewImage(true);
    }

    const handleClosePreviewImage = () => {
        navigation.setOptions({
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
            }
        })
        setIsVisiblePreviewImage(false);
        setImageUrl('')
    }

    const onSwipeLeft = (imageUrl) => {
        if(currentImageIndex === imageUrls.length) return ;
        const imageIndex = imageUrls.findIndex(image => image == imageUrl);
        setCurrentImageIndex((state) => state + 1 );
        setImageUrl((state) => imageUrls[imageIndex + 1]);
    }

    const onSwipeRight = (imageUrl) => {
        if(currentImageIndex === 1) return;
        const imageIndex = imageUrls.findIndex(image => image == imageUrl);
        setCurrentImageIndex((state) => state - 1);
        setImageUrl((state) => imageUrls[imageIndex - 1]);
    }
    
    return (
        <>
            {isVisiblePreviewImage && <PreviewImage imageUrl={imageUrl} handleClosePreviewImage={handleClosePreviewImage} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} currentImageIndex={currentImageIndex} totalImage={totalImage}/>}
            <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {currentUser && currentUser.email === "ttvyisqui's@gmail.com" ?
                    <Image source={{uri: IMAGE_URL.myLove}} style={styles.avatar}/> :
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>}
            </View>
            
            <View style={styles.greeting}>
                <Text style={styles.greetingText}>{greeting}</Text>
                <Text style={styles.lovingDateText}>{lovingDateMessage}</Text>
            </View>
            <FlatGrid
                itemDimension={500}
                data={MEMORIES_DATA}
                renderItem={({item, index}) => (
                    <View style={styles.card}>
                        <View style={{width: '100%', height: 50}}>
                            <Image source={{uri: IMAGE_URL.ours}} style={styles.avatarOurs}
                                   resizeMode="cover"/>
                        </View>
                        
                        <View style={styles.cardText}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View aspectRatio={1}>
                            <View style={{flexDirection: 'column', width: '100%', height: 250}}>
                                <TouchableOpacity style={{width: '100%', height: '50%'}} onPress={() => handlePressImage(MEMORIES_DATA[index].urls, MEMORIES_DATA[index].urls[0])}>
                                    <Image
                                        style={{width: '100%', height: '100%'}}
                                        resizeMode="cover"
                                        source={{uri: MEMORIES_DATA[index].urls[0]}}

                                    />
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', width: '100%', height: '100%'}}>
                                    <TouchableOpacity style={{width: '50%', height: '50%'}} onPress={() => handlePressImage(MEMORIES_DATA[index].urls, MEMORIES_DATA[index].urls[1])}>
                                        <Image
                                            style={{width: '100%', height: '100%'}}
                                            resizeMode="cover"
                                            source={{uri: MEMORIES_DATA[index].urls[1]}}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{width: '50%', height: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={() => handlePressImage(MEMORIES_DATA[index].urls, MEMORIES_DATA[index].urls[2])}>
                                        <Image
                                            style={styles.lastImage}
                                            resizeMode="cover"
                                            source={{uri: MEMORIES_DATA[index].urls[2]}}
                                        />
                                        {item.urls.length > 3 &&
                                            <Text style={styles.restImages}>+{item.urls.length - 3}</Text>}
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    
                    </View>
                )}
            />
        </View>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    container: {
        position: 'relative',
        paddingVertical: SPACING * 2,
        paddingHorizontal: SPACING * 2,
        marginBottom: 170,
        marginTop: 20,
        zIndex: 1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        zIndex: 1
    },
    button: {
        borderRadius: SPACING / 2,
        width: SPACING * 7,
        height: SPACING * 3.5,
        backgroundColor: COLORS.primary,
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 'auto',
    },
    avatarOurs: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    image: {
        flex: 1,
        zIndex: 0,
        height: SPACING * 25,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.6
    },
    greeting: {
        marginTop: 50
    },
    greetingText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    lovingDateText: {},
    card: {
        flex: 1,
        borderRadius: 10,
        margin: 10,
        width: 'auto',
        padding: 15,
        backgroundColor: '#ffffff',
        
    },
    cardText: {},
    title: {
        paddingVertical: 10
    },
    lastImage: {
        width: '100%', height: '100%', position: 'relative'
    },
    restImages: {
        position: 'absolute',
        top: '20%',
        fontSize: 50,
        color: 'white'
    },
    notAuthorizedContainer:
        {
            marginTop: '70%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
});
