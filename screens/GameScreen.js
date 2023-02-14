import {useState, useEffect, useRef} from "react";
import {StyleSheet, View, ImageBackground, Animated, Easing} from "react-native";
import GameItem from "../components/Game/GameItem";
import {FlatGrid} from 'react-native-super-grid';
import GameModal from "../components/UI/GameModal";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {IMAGE_URL} from "../constants/ImageUrl";
import CustomModal from "../components/UI/Modal";
import {
    updatePressedItemIds,
    generateGameData,
} from "../store/userSlice";
import {Audio} from "expo-av";
import { useRoute } from '@react-navigation/native';
import {checkWhetherHaveIp14} from "../store/userSlice";
const GameScreen = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const {currentUser, pressedItemIds, gameData} = useSelector((state) => state.user);
    const [isOpenGiftBox, setIsOpenGiftBox] = useState(false);
    const [rewardDescription, setRewardDescription] = useState("");
    const [rewardImage, setRewardImage] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [soundPlay, setSoundPlay] = useState(null);
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const rotateAnimation = useRef(new Animated.Value(0.5)).current;
    const scale = () => {
        Animated.loop(
        Animated.timing(scaleAnimation, {
            toValue: 1.15,
            duration: 3000,
            easing: Easing.bounce,
            useNativeDriver: true,
        }),
    ).start();
    };

    const rotate = () => {
        Animated.loop(
            Animated.timing(rotateAnimation, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    };

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
    });


    useEffect(() => {

        if(pressedItemIds?.length === 0) {
            dispatch(generateGameData());
        }

        if(gameData?.length > 0) {
            dispatch(checkWhetherHaveIp14());
        }
    }, [])

    useEffect(() => {
        scale();
        rotate();
        if(route.name === "GameScreen") {
        (async () => {
            const {sound} = await Audio.Sound.createAsync(require('../assets/music.mp3'));
            if (sound) {
                setSoundPlay(sound);
            }

            await sound.playAsync();

            return soundPlay
                ? () => {
                    console.log('Unloading Sound');
                    sound.unloadAsync();
                }
                : undefined;
        })();

        }
    }, [route.name])

    const handleChooseGift = async (gift) => {
        if (!currentUser) {
            setIsAuthorized(false);
        } else if (pressedItemIds.includes(gift.id)) {
            console.log('You chose this gift')
        } else {
            const payload = {
                username: currentUser.username,
                userId: currentUser.id,
                rewardName: gift.description,
                rewardId: gift.id,
                rewardImage: gift.uri
            };
            await axios.post('https://lucky-gift.vercel.app/api/history/', payload).then(async (response) => {
                dispatch(updatePressedItemIds(gift.id));
                setIsOpenGiftBox(true);
                setIsShowModal(true);
                setRewardDescription(gift.description);
                setRewardImage(gift.uri);
            }).catch((error) => {
                console.log(error)
            });
        }
        
    }
    const handleCloseModal = () => {
        setIsShowModal(false);
    }
    
    const handleCloseAuthorizedModal = () => {
        setIsAuthorized(true);
    }

    
    return (
        <View style={styles.container}>
            <GameModal isShowModal={isShowModal} onCloseModal={handleCloseModal} rewardImage={rewardImage}
                       rewardDescription={rewardDescription}/>
            <CustomModal isShowModal={!isAuthorized} onCloseModal={handleCloseAuthorizedModal}
                         description="Bạn cần đăng nhập để chơi game này."/>
            <ImageBackground source={{uri: IMAGE_URL.gameBackground}} resizeMode="cover" style={styles.image}>
                <FlatGrid
                    itemDimension={100}
                    data={gameData}
                    renderItem={({item}) => {
                        return <GameItem
                            gameItemUri={isOpenGiftBox && pressedItemIds.includes(item.id) ? item.uri : item.defaultUri}
                            onPress={() => handleChooseGift(item)}/>
                    }
                    }
                />

                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.flower1 }}
                    source={{uri: IMAGE_URL.flower1}} />
                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.flower2 }}
                    source={{uri: IMAGE_URL.flower2}} />
                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.flower3 }}
                    source={{uri: IMAGE_URL.flower3}} />

                <ImageBackground source={{uri: IMAGE_URL.cat}} resizeMode="cover"
                                 style={styles.cat}/>

                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.lightRing }}
                    source={{uri: IMAGE_URL.lightRing}} />

                <ImageBackground source={{uri: IMAGE_URL.bigCloud3}} resizeMode="cover" style={styles.bigCloud2}/>
                <Animated.Image
                    style={{

                        transform: [{scale: scaleAnimation}],
                    ...styles.bigCloud2
                    }}
                    source={{uri: IMAGE_URL.bigCloud3}}
                />
                <ImageBackground source={{uri: IMAGE_URL.frame}} resizeMode="cover" style={styles.frameTop}/>
                <ImageBackground source={{uri: IMAGE_URL.frame}} resizeMode="cover" style={styles.frameBottom}/>
                <ImageBackground source={{uri: IMAGE_URL.lantern}} resizeMode="cover" style={styles.lantern1}/>
                <ImageBackground source={{uri: IMAGE_URL.lantern}} resizeMode="cover" style={styles.lantern2}/>
                <ImageBackground source={{uri: IMAGE_URL.lionDance1}} resizeMode="cover" style={styles.lionDance1}/>
                <ImageBackground source={{uri: IMAGE_URL.lionDance2}} resizeMode="cover" style={styles.lionDance2}/>
            </ImageBackground>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    lightRing: {
        width: 160,
        height: 160,
        position: 'absolute',
        top: 20,
        left: '30%',
    },
    cat: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 40,
        left: '38%',
    },
    frameTop: {
        width: '100%',
        height: 60,
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [{rotate: '180deg'}],
    },
    frameBottom: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    lantern1: {
        width: 120,
        height: 120,
        position: 'absolute',
        top: 0,
        left: 70,
    },
    lantern2: {
        width: 120,
        height: 120,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    flower1: {
        width: 80,
        height: 80,
        position: 'absolute',
        top: 50,
        left: 0,
    },
    flower2: {
        width: 80,
        height: 80,
        position: 'absolute',
        top: 20,
        left: 50,
    },
    flower3: {
        width: 80,
        height: 80,
        position: 'absolute',
        top: 80,
        left: 50,
    },
    bigCloud1: {
        width: 400,
        height: 100,
        position: 'absolute',
        bottom: 60,
        left: 0,
    },
    lionDance1: {
        width: 180,
        height: 180,
        position: 'absolute',
        bottom: 50,
        left: 0,
    },
    lionDance2: {
        width: 180,
        height: 180,
        position: 'absolute',
        bottom: 30,
        right: 0,
    },
    bigCloud2: {
        width: 400,
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    textureCloud1: {
        width: 100,
        height: 50,
        position: 'absolute',
        top: 50,
        left: 30
    },
    textureCloud2: {
        width: 100,
        height: 50,
        position: 'absolute',
        top: 80,
        right: 30
    },
    animatedCloud: {
        flex: 1
    },
});
