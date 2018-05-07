
import {IAuthor} from './IAuthor';
import {IAlbum} from './IAlbum';
import {IGenre} from "./IGenre";
import {IUser} from "./IUser";

export interface IMusic {
    _id: string
    title: string
    author:  IAuthor
    album: IAlbum
    genre: IGenre
    filename?: string
    creator?: IUser
}
