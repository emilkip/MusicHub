
import {IAuthor} from './IAuthor';

export interface IAlbum {
    _id: string
    title: string
    author: IAuthor
    cover?: string
}
