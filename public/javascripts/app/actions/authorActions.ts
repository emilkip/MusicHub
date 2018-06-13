import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IAuthor} from "../common/interfaces";


export function getAuthors(): IReduxAction {
    return {
        type: 'GET_AUTHORS',
        payload: {}
    }
}


export function pushAuthors(authors: any[]): IReduxAction {
    return {
        type: 'PUSH_AUTHORS',
        payload: {
            authors
        }
    }
}

export function setCurrentAuthor(authorData: IAuthor): IReduxAction {
    return {
        type: 'SET_CURRENT_AUTHOR',
        payload: {
            authorData
        }
    }
}

export function clearCurrentAuthor(): IReduxAction {
    return {
        type: 'CLEAR_CURRENT_AUTHOR',
        payload: {}
    }
}
