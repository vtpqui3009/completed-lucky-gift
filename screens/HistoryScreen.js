import {useEffect, useState} from "react";
import {FlatList, StyleSheet, View, Text} from "react-native";
import HistoryItem from "../components/History/HistoryItem";
import {SPACING} from "../constants/Spacing";
import {COLORS} from "../constants/Colors";
import {getAllHistories} from "../service/HistoryService";
const HistoryScreen = () => {
    const [histories,setHistories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await getAllHistories();
            setHistories(response);
            setIsLoading(false);
        })()
    }, [])
    const renderItem = ({item}) => {
        return <HistoryItem uri={item.rewardImage} gift={item}
                            time={new Date(item.createdAt).toLocaleDateString('vi-VN')}/>
    }
    return (
        <>
            {isLoading ? <View style={styles.loadingContainer}><Text style={styles.loadingText}>Loading ...</Text></View> :             <View style={styles.history}>
                {histories.length === 0 && <View style={styles.noticeTextWrapper}>
                    <Text style={styles.noticeText}>Em chưa có lịch sử quay nha em yêu</Text>
                </View>}
                <FlatList data={histories} renderItem={renderItem} keyExtractor={(item) => item.id}/>
            </View>}

        </>

    
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
      color: COLORS.primary,
      fontWeight:"bold",
        textAlign: 'center'
    },
    history: {
        flex: 1,
        paddingVertical: SPACING / 2,
        marginBottom: SPACING * 10,
        marginTop: 20,
    },
    noticeTextWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    noticeText: {
        fontWeight: 'bold',
        color: COLORS.primary
    },
    notAuthorizedContainer:
        {
            position: 'absolute',
            top: '150%',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
})
