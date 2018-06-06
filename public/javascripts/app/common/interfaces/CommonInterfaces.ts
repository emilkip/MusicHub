import {IMusic} from "./IMusic";
import {IAlbum} from "./IAlbum";
import {IAuthor} from "./IAuthor";
import {IPlaylist} from "./IPlaylist";

export interface IReduxAction {
    type: string
    payload?: any
}

export interface ISearchResults {
    musicList: IMusic[]
    playlists: IPlaylist[]
    albums: IAlbum[]
    authors: IAuthor[]
}
