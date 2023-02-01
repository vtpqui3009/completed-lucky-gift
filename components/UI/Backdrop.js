import React from "react";
import {StyleSheet, View} from "react-native";

const Backdrop = ({isShowBackdrop}) => {
    return <> {isShowBackdrop && <View style={styles.backdrop}></View>} </>;
};

export default Backdrop;

const styles = StyleSheet.create({
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100vh',
        background: '#000000',
        opacity: 0.2,
        zIndex: 2
    },
});


