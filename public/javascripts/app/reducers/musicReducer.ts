import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import {IGenre, IMusic} from "../common/interfaces";
import {handleActions} from "redux-actions";

interface IDefaultState {
    status: string
    musicList: IMusic[]
    currentMusic: IMusic
    genres: IGenre[]
}

const defaultState: IDefaultState = {
    status: 'IDLE',
    musicList: [],
    genres: [],
    currentMusic: {} as any
};


export const musicReducer = handleActions({
    CHANGE_MUSIC_LIST_STATUS(state, action: IReduxAction) {
        return {
            ...state,
            status: action.payload.status
        }
    },
    SET_CURRENT_MUSIC(state, action: IReduxAction) {
        return {
            ...state,
            currentMusic: action.payload.music
        };
    },
    PUSH_MUSIC(state, action: IReduxAction) {
        return {
            ...state,
            musicList: [...state.musicList, action.payload.music]
        };
    },
    PUT_MULTIPLE_MUSIC(state, action: IReduxAction) {
        return {
            ...state,
            musicList: [...action.payload.musicList]
        };
    },
    RESET_CURRENT_MUSIC(state, action: IReduxAction) {
        return {
            ...state,
            currentMusic: {} as any
        }
    },
    PUT_GENRES(state, action: IReduxAction) {
        return {
            ...state,
            genres: action.payload.genres
        }
    }
}, defaultState);
