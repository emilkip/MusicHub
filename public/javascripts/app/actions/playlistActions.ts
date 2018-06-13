import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IPlaylist} from "../common/interfaces";


export function pushPlaylists(playlists: IPlaylist[]): IReduxAction {
    return {
        type: 'PUSH_PLAYLISTS',
        payload: {
            playlists
        }
    }
}

export function setCurrentPlaylist(playlistData: IPlaylist): IReduxAction {
    return {
        type: 'SET_CURRENT_PAYLIST',
        payload: {
            playlistData
        }
    }
}

export function clearCurrentPlaylist(): IReduxAction {
    return {
        type: 'CLEAR_CURRENT_PLAYLIST',
        payload: {}
    }
}
