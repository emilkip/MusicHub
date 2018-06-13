import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IAlbum, IAuthor} from "../common/interfaces";


export function pushAlbums(albums: IAlbum[]): IReduxAction {
    return {
        type: 'PUSH_ALBUMS',
        payload: {
            albums
        }
    }
}

export function clearAlbums(): IReduxAction {
    return {
        type: 'CLEAR_ALBUMS',
        payload: {}
    }
}

export function setCurrentAlbum(albumData: IAuthor): IReduxAction {
    return {
        type: 'SET_CURRENT_ALBUM',
        payload: {
            albumData
        }
    }
}

export function clearCurrentAlbum(): IReduxAction {
    return {
        type: 'CLEAR_CURRENT_ALBUM',
        payload: {}
    }
}
