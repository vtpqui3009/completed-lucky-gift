import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {IMAGE_URL} from "../../constants/ImageUrl";
import {COLORS} from "../../constants/Colors";

const GameModal = ({isShowModal, onCloseModal, rewardDescription, rewardImage}) => {
    return (
        <React.Fragment>
            {isShowModal && (
                <View style={styles.modalContainer}>
                    <View style={styles.modalImage}>
                        <View>
                            <Image
                                source={{
                                    uri: IMAGE_URL.modal,
                                }}
                                style={{width: 300, height: 200}}
                            />
                        </View>
                        <TouchableOpacity onPress={onCloseModal} style={styles.closeIcon}>
                            <Image
                                source={{
                                    uri: IMAGE_URL.closeIcon,
                                }}
                                style={{width: 40, height: 40}}
                            />
                        </TouchableOpacity>
                    </View>
                    {rewardImage && <View style={styles.modalContent}>
                        <Image source={{
                            uri: rewardImage,
                        }}
                               style={{width: 100, height: 100}}/>
                        <Text>Chúc mừng ! Em nhận được <Text
                            style={styles.modalReward}>{rewardDescription}</Text></Text>
                    </View>}
                </View>
            )}
        </React.Fragment>
    );
};

export default GameModal;

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        zIndex: 3,
    },
    modalImage: {
        position: 'relative'
    },
    modalReward: {
        color: COLORS.primary,
    },
    closeIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: '0%',
        right: '0%',
        zIndex: 4,
    },
    modalContent: {
        width: '70%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: '10%',
        left: '15%',
        zIndex: 4,
    }
});


