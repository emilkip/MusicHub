import { IReduxAction } from "../common/interfaces/CommonInterfaces";


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


export function createAuthor(author: any): IReduxAction {
    return {
        type: 'CREATE_AUTHOR',
        payload: {
            author
        }
    }
}


export default {
    getAuthors,
    createAuthor
}