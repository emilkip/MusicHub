import { IReduxAction } from "../common/interfaces/CommonInterfaces";


export function getAlbums(albums: any[]): IReduxAction {
    return {
        type: 'GET_ALBUMS',
        payload: {
            albums
        }
    }
}


export function createAlbum(album: any): IReduxAction {
    return {
        type: 'CREATE_ALBUM',
        payload: {
            album
        }
    }
}


export default {
    getAlbums,
    createAlbum
}