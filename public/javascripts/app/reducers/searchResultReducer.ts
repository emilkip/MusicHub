import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IAuthor, IMusic, IAlbum, IPlaylist} from "../common/interfaces";

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


export function searchResultReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        PUT_RESULTS(): IDefaultState {
            return {
                musicList: action.payload.musicList || [],
                playlists: action.payload.playlists || [],
                albums: action.payload.albums || [],
                authors: action.payload.authors || []
            };
        },
        CLEAR_RESULTS(): IDefaultState {
            return defaultState;
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}
