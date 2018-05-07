import { IReduxAction } from "../common/interfaces/CommonInterfaces";

interface IDefaultState {
    authors: any[]
}

const defaultState: IDefaultState = {
    authors: []
};


export function authorReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        CREATE_AUTHOR(): IDefaultState {
            return {
                ...state,
                authors: [...state.authors, action.payload.author]
            };
        },
        GET_AUTHORS(): IDefaultState {
            return {
                authors: state.authors
            };
        },
        PUSH_AUTHORS(): IDefaultState {
            return {
                ...state,
                authors: [...state.authors, ...action.payload.authors]
            };
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}
