import {createSlice} from "@reduxjs/toolkit";
import shuffle from "../utils/shuffle";
import {GAME_DATA} from "../DATA/GameData";
import {randomNumber} from "../utils/randomNumber";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        token: '',
        isLogin: false,
        startDay: new Date().getDate(),
        pressedItemIds: [],
        gameData: shuffle(GAME_DATA).slice(0, 9)
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.token = action.payload.token;
            state.currentUser = action.payload.currentUser;
        },
        updateStartDay: (state, action) => {
            state.startDay = action.payload;
        },
        updatePressedItemIds: (state, action) => {
            const today = new Date().getDate();
            if (state.pressedItemIds.length < 9) {
                state.pressedItemIds.push(action.payload);
            } else if (state.pressedItemIds.length >= 9 && today === state.startDay) {
                state.pressedItemIds = [];
            }
        },
        checkWhetherGiftsIncludesIp14: (state, action) => {
            const isHaveIp14Gift = state.gameData.some(gift => gift.id === 33);
            if(isHaveIp14Gift) {
                const randomNum = randomNumber(1,100);
                if(randomNum === 10) {
                    state.gameData = shuffle(GAME_DATA).slice(0, 9);
                } else {
                    const initGameDataWithoutIp14 = state.gameData.filter(gift => gift.id !== 33);
                    state.gameData = [...initGameDataWithoutIp14, GAME_DATA[0]];;
                }
            }
        },
        generateGameData: (state, action) => {
           state.gameData = shuffle(GAME_DATA).slice(0, 9);
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
    checkWhetherGiftsIncludesIp14,
    generateGameData,
    updatePressedItemIds,
    updateStartDay,
} = userSlice.actions;

export default userSlice.reducer;
