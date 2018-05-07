import { IReduxAction } from "../common/interfaces/CommonInterfaces";

interface IDefaultState {
    musicList: any[]
}

const defaultState: IDefaultState = {
    musicList: []
};


export function musicReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        CREATE_MUSIC(): IDefaultState {
            return {
                ...state,
                musicList: [...state.musicList, action.payload.music]
            };
        },
        GET_MUSIC(): IDefaultState {
            return {
                ...state,
                musicList: [...action.payload.musicList]
            };
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}