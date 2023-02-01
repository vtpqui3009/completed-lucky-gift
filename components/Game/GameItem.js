import {TouchableOpacity, Image, StyleSheet} from "react-native";

const GameItem = ({gameItemUri, onPress}) => {
    return <TouchableOpacity onPress={onPress} style={styles.gameItem}>
        <Image source={{uri: gameItemUri}}
               style={{width: 100, height: 100}} resizeMode='cover'/>
    </TouchableOpacity>
}

export default GameItem;

const styles = StyleSheet.create({
    gameItem: {
        flex: 1
    }
});