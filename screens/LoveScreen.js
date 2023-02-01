import {useEffect, useRef} from "react";
import {View, Text, Image, StyleSheet, ImageBackground, Animated, Easing} from "react-native";
import {IMAGE_URL} from "../constants/ImageUrl";
import {COLORS} from "../constants/Colors";
import {useNavigation} from "@react-navigation/native";

const LoveScreen = () => {
    const navigation = useNavigation();
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const rotateAnimation = useRef(new Animated.Value(0.5)).current;
    const handleReturnBack = () => {
        navigation.goBack()
    }

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
        scale();
        rotate();
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentOuter}></View>
                <View style={styles.contentInner}>
                    <View style={styles.contentInnerHeader}>
                        <Text style={styles.title}>Gửi em</Text>
                        <Image source={{uri: IMAGE_URL.pinkHeart}} style={styles.pinkHeart}/>
                    </View>
                    
                    <Text style={styles.contentDescription}>Một
                        năm qua là một năm đầy may mắn và ý nghĩa với anh, cám ơn em vì đã chọn ở bên anh.
                        Năm mới đến đồng nghĩa anh lại có thể chăm sóc và yêu thương em nhiều hơn năm qua.
                        Anh chúc em có nhiều sức khỏe, bình an và may mắn. Chúc em dù gặp bất kì hoàn cảnh nào em cũng
                        là
                        em lúc như ban đầu. Chúc anh có thể luôn có thể bên cạnh chăm sóc, yêu thương em. Chúc hai
                        ta năm mới nào cũng yêu thương nhau nhiều hơn năm cũ.
                        Yêu em .</Text>
                    
                    <View style={styles.contentInnerFooter}>
                        <Text style={styles.footerTitle}>Anh</Text>
                    </View>
                </View>
                <Animated.Image
                    style={{transform: [{scale: scaleAnimation}], ...styles.lantern }}
                    source={{uri: IMAGE_URL.lantern}} />

                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.bigFlower1 }}
                    source={{uri: IMAGE_URL.bigFlower1}} />
                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.bigFlower2 }}
                    source={{uri: IMAGE_URL.bigFlower2}} />

                <ImageBackground source={{uri: IMAGE_URL.apricotBlossom}} resizeMode="cover"
                                 style={styles.apricotBlossom1}/>
                <ImageBackground source={{uri: IMAGE_URL.apricotBlossom}} resizeMode="cover"
                                 style={styles.apricotBlossom2}/>
                <ImageBackground source={{uri: IMAGE_URL.apricotBlossom}} resizeMode="cover"
                                 style={styles.apricotBlossom3}/>
                <ImageBackground source={{uri: IMAGE_URL.apricotBlossom}} resizeMode="cover"
                                 style={styles.apricotBlossom4}/>
                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.bigFlower1Second }}
                    source={{uri: IMAGE_URL.bigFlower1}} />
                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.bigFlower3 }}
                    source={{uri: IMAGE_URL.bigFlower3}} />
                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.bigFlower2Small }}
                    source={{uri: IMAGE_URL.bigFlower2}} />
                <Animated.Image
                    style={{transform: [{rotate: interpolateRotating}], ...styles.bigFlower2Smallest }}
                    source={{uri: IMAGE_URL.bigFlower2}} />
                <View style={styles.returnButton}>
                    <ImageBackground source={{uri: IMAGE_URL.leftInvitation}} style={styles.squareInner}/>
                    <ImageBackground source={{uri: IMAGE_URL.gameBackground}} style={styles.squareWrapper}/>
                        <Text style={styles.returnText} onPress={handleReturnBack}>Quay về</Text>
                </View>
            </View>
        </View>
    );
};

export default LoveScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    pinkHeart: {
        width: 32,
        height: 32
    },
    content: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentOuter: {
        position: 'absolute',
        width: '90%',
        height: '95%',
        backgroundColor: COLORS.fifth,
        zIndex: 0
    },
    contentInner: {
        position: 'absolute',
        paddingHorizontal: 20,
        top: '20%',
        width: '90%',
        height: '95%',
        zIndex: 1
    },
    contentInnerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    contentInnerFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "auto",
        marginTop: 20
    },
    title: {
        fontSize: 30,
        fontFamily: 'dancing-script-bold',
        marginLeft: 10
    },
    footerTitle: {
        fontSize: 20,
        fontFamily: 'dancing-script-bold',
    },
    contentDescription: {
        fontFamily: 'dancing-script-regular',
        fontSize: 18,
        letterSpacing: 1,
        lineHeight: 20
    },
    lantern: {
        width: 120,
        height: 120,
        position: 'absolute',
        top: -10,
        right: 0,
    },
    bigFlower1: {
        width: 120,
        height: 120,
        position: 'absolute',
        top: -30,
        left: -30,
    },
    bigFlower2: {
        width: 80,
        height: 80,
        position: 'absolute',
        top: 20,
        left: 40,
    },
    bigFlower1Second: {
        width: 120,
        height: 120,
        position: 'absolute',
        top: '50%',
        right: -40,
    },
    bigFlower3: {
        width: 80,
        height: 80,
        position: 'absolute',
        bottom: '10%',
        right: 20,
    },
    bigFlower2Small: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: '15%',
        right: 0,
    },
    bigFlower2Smallest: {
        width: 30,
        height: 30,
        position: 'absolute',
        bottom: '10%',
        right: '20%',
    },
    apricotBlossom1: {
        width: 40,
        height: 30,
        position: 'absolute',
        bottom: '0%',
        left: 0,
    },
    apricotBlossom2: {
        width: 40,
        height: 40,
        position: 'absolute',
        bottom: '50%',
        left: -10,
    },
    apricotBlossom3: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: -10,
        left: '60%',
    },
    apricotBlossom4: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: '30%',
        right: -10,
    },
    returnButton: {
        position: 'absolute',
        bottom: '10%',
        left: '45%'
    },
    squareInner: {
        width: 50,
        height: 50,
        transform: [{rotate: '45deg'}],
        position: 'absolute',
        top: '10%',
        left: '10%',
        zIndex: 1

    },
    squareWrapper: {
        width: 60,
        height: 60,
        transform: [{rotate: '45deg'}],
        position: 'relative',
        zIndex: 0
    },
    returnText: {
        fontFamily: 'dancing-script-bold',
        color: 'white',
        position: 'absolute',
        top: '25%',
        left: '10%',
        fontSize: 16,
        zIndex: 2
    },
    notAuthorizedText: {
        fontFamily: 'dancing-script-bold',
        textAlign: 'center',
        marginTop: 100,
        fontSize: 25
    }
})
