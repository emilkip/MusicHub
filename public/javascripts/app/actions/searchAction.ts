import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IAlbum, IAuthor, IMusic, IPlaylist} from "../common/interfaces";

interface IResult {
    musicList: IMusic[]
    albums: IAlbum[]
    authors: IAuthor[]
    playlists: IPlaylist[]
}


export function putResults(searchResult: IResult): IReduxAction {
    return {
        type: 'PUT_RESULTS',
        payload: {
            musicList: searchResult.musicList,
            albums: searchResult.albums,
            authors: searchResult.authors,
            playlists: searchResult.playlists
        }
    }
}

export function clearResults(): IReduxAction {
    return {
        type: 'CLEAR_RESULTS',
        payload: {}
    }
}
