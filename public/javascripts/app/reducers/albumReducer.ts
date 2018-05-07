import { IReduxAction } from "../common/interfaces/CommonInterfaces";

interface IDefaultState {
    albums: any[]
}

const defaultState: IDefaultState = {
    albums: []
};

export function albumReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        CREATE_ALBUM(): IDefaultState {
            return {
                ...state,
                albums: [...state.albums, action.payload.album]
            };
        },
        GET_ALBUMS(): IDefaultState {
            return {
                ...state,
                albums: [...state.albums, ...action.payload.albums]
            };
        },
        GET_ALBUMS_BY_AUTHOR(): IDefaultState {
            return {
                ...state,
                albums: [...state.albums, ...action.payload.albums]
            };
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}