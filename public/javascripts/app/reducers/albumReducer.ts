import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {handleActions} from 'redux-actions';
import {IAlbum, IMusic} from "../common/interfaces";

interface IDefaultState {
    currentAlbums: IAlbum[]
    currentAlbum: {
        album: IAlbum
        musicList: IMusic[]
    }
}

const defaultState: IDefaultState = {
    currentAlbums: [],
    currentAlbum: {
        album: {} as any,
        musicList: []
    }
};


export const albumReducer = handleActions({
    PUSH_ALBUMS(state, {payload}: IReduxAction) {
        return {
            ...state,
            currentAlbums: payload.albums
        }
    },
    CLEAR_ALBUMS() {
        return defaultState;
    },
    SET_CURRENT_ALBUM(state, {payload}: IReduxAction) {
        return {
            ...state,
            currentAlbum: {
                album: payload.albumData.album,
                musicList: payload.albumData.musicList
            }
        };
    },
    CLEAR_CURRENT_ALBUM(state, {payload}: IReduxAction) {
        return {
            ...state,
            currentAlbum: {
                album: {} as any,
                musicList: []
            }
        };
    }
}, defaultState);
