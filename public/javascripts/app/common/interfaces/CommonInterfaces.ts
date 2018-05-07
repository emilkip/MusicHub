import {IMusic} from "./IMusic";
import {IAlbum} from "./IAlbum";
import {IAuthor} from "./IAuthor";

export interface IReduxAction {
    type: string
    payload: any
}

export interface ISearchResults {
    musicList: IMusic[]
    albums: IAlbum[]
    authors: IAuthor[]
}
