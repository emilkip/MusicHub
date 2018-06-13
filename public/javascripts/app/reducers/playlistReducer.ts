
import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {handleActions} from 'redux-actions';
import {IPlaylist} from "../common/interfaces";

interface IDefaultState {
    playlists: IPlaylist[]
    currentPlaylist: {
        playlistInfo: IPlaylist,
        musicList: any[]
    }
}

const defaultState: IDefaultState = {
    playlists: [],
    currentPlaylist: {
        playlistInfo: {} as any,
        musicList: []
    }
};


export const playlistReducer = handleActions({
    PUSH_PLAYLISTS(state, {payload}: IReduxAction) {
        return {
            ...state,
            playlists: payload.playlists
        }
    },
    SET_CURRENT_PAYLIST(state, {payload}: IReduxAction) {
        return {
            ...state,
            currentPlaylist: {
                playlistInfo: payload.playlistData.playlist,
                musicList: payload.playlistData.musicList
            }
        }
    },
    CLEAR_CURRENT_PLAYLIST() {
        return defaultState;
    },
}, defaultState);
