import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IAuthor, IMusic, IAlbum, IPlaylist} from "../common/interfaces";
import {handleActions} from "redux-actions";

interface IDefaultState {
    musicList: IMusic[]
    albums: IAlbum[]
    authors: IAuthor[]
    playlists: IPlaylist[]
}

const defaultState: IDefaultState = {
    musicList: [],
    albums: [],
    authors: [],
    playlists: []
};


export const searchResultReducer = handleActions({
    PUT_RESULTS(state, action: IReduxAction) {
        return {
            musicList: action.payload.musicList || [],
            playlists: action.payload.playlists || [],
            albums: action.payload.albums || [],
            authors: action.payload.authors || []
        };
    },
    CLEAR_RESULTS(state, action: IReduxAction) {
        return defaultState;
    }
}, defaultState);
