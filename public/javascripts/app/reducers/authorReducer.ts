import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import {handleActions} from 'redux-actions';
import {IAlbum, IAuthor} from "../common/interfaces";

interface IDefaultState {
    authors: any[]
    currentAuthor: {
        author: IAuthor,
        albums: IAlbum[]
    }
}

const defaultState: IDefaultState = {
    authors: [],
    currentAuthor: {
        author: {} as any,
        albums: []
    }
};

export const authorReducer = handleActions({
    GET_AUTHORS(state, {payload}: IReduxAction) {
        return {
            authors: state.authors
        };
    },
    PUSH_AUTHORS(state, {payload}: IReduxAction) {
        return {
            ...state,
            authors: [...state.authors, ...payload.authors]
        };
    },
    SET_CURRENT_AUTHOR(state, {payload}: IReduxAction) {
        const albums: IAlbum[] = payload.authorData.albums.map((album: IAlbum) => {
            album.author = payload.authorData.author;
            return album;
        });

        return {
            ...state,
            currentAuthor: {
                author: payload.authorData.author,
                albums
            }
        };
    },
    CLEAR_CURRENT_AUTHOR(state, {payload}: IReduxAction) {
        return {
            ...state,
            currentAuthor: {
                author: {} as any,
                albums: []
            }
        };
    },
}, defaultState);
