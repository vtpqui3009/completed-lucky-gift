import {createSlice} from "@reduxjs/toolkit";
import shuffle from "../utils/shuffle";
import {GAME_DATA} from "../DATA/GameData";
import {randomNumber} from "../utils/randomNumber";
import {getAllHistories} from "../service/HistoryService";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        token: '',
        isLogin: false,
        pressedItemIds: [],
        gameData: shuffle(GAME_DATA).slice(0, 9),
        histories: []
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.token = action.payload.token;
            state.currentUser = action.payload.currentUser;
        },
        updateUserHistories: async (state, action) => {
            state.histories =  action.payload;
        },
        updatePressedItemIds: (state, action) => {
            if (state.pressedItemIds.length < 9) {
                state.pressedItemIds.push(action.payload);
            } else if (state.pressedItemIds.length >= 9) {
                console.log("work")
                state.pressedItemIds = [];
                state.gameData = shuffle(GAME_DATA).slice(0, 9);
            }
        },
        generateGameData: (state, action) => {
           state.gameData = shuffle(GAME_DATA).slice(0, 9);
        },
        checkWhetherHaveIp14: (state, action) => {
            const isHaveIp14Gift = state.gameData.some(gift => gift.id === 33);
            if(isHaveIp14Gift) {
                const randomNum = randomNumber(1,100);
                if(randomNum === 10) {
                    state.gameData = shuffle(GAME_DATA).slice(0, 9);
                } else {
                    const initGameDataWithoutIp14 = state.gameData.filter(gift => gift.id !== 33);
                    state.gameData = [...initGameDataWithoutIp14, GAME_DATA[0]];
                }
            }
        },
        logout: (state, action) => {
            state.isLogin = false;
            state.token = '';
            state.currentUser = null;
        },
    }
});

export const {
    login,
    logout,
    generateGameData,
    checkWhetherHaveIp14,
    updateUserHistories,
    updatePressedItemIds,
} = userSlice.actions;

export default userSlice.reducer;
