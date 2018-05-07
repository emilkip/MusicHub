import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import { IAuthor, IMusic, IAlbum } from "../common/interfaces";

interface IDefaultState {
    musicList: IMusic[]
    albums: IAlbum[]
    authors: IAuthor[]
}

const defaultState: IDefaultState = {
    musicList: [],
    albums: [],
    authors: []
};


export function searchResultReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        GET_RESULTS(): IDefaultState {
            return {
                musicList: action.payload.musicList,
                albums: action.payload.albums,
                authors: action.payload.authors
            };
        },
        CLEAR_RESULTS(): IDefaultState {
            return defaultState;
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}
