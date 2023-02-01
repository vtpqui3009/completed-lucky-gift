import {useState} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {SPACING} from "../../constants/Spacing";
import {COLORS} from "../../constants/Colors";
import {IMAGE_URL} from "../../constants/ImageUrl";

const HistoryItem = ({uri, gift, time}) => {
    return <TouchableOpacity style={styles.historyItem}>
        <View style={styles.historyImage}>
            <Image source={{uri: uri}} style={{width: 70, height: 70}}/>
        </View>
            <View style={styles.description}>
                <Text>Em đã nhận được <Text style={styles.historyReward}>{gift.rewardName}</Text></Text>
                <Text style={styles.historyTime}>Ngày nhận: {time}</Text>
            </View>
    
    </TouchableOpacity>
}

export default HistoryItem;

const styles = StyleSheet.create({
    historyItem: {
        paddingHorizontal: SPACING / 2.5,
        paddingVertical: SPACING,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.fourth,
        borderBottomWidth: 1
    },
    historyImage: {
        width: '20%'
    },
    historyReward: {
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    historyTime: {
        fontStyle: 'italic',
        opacity: 0.7,
        paddingVertical: SPACING / 2,
        fontSize: 13,
        fontWeight: 'bold'
    },
    description: {
        width: '80%'
    },
})
