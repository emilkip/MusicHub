import { IReduxAction } from "../common/interfaces/CommonInterfaces";

interface IDefaultState {
    user: any
}

const defaultState: IDefaultState = {
    user: {}
};

export function profileReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        SET_USER(): IDefaultState {
            return {
                ...state,
                user: action.payload.user
            };
        },
        GET_USER(): IDefaultState {
            return {
                user: state.user
            };
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}
