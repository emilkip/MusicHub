import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {handleActions} from "redux-actions";

interface IDefaultState {
    user: any
}

const defaultState: IDefaultState = {
    user: {}
};

export const profileReducer = handleActions({
    SET_USER(state, action: IReduxAction) {
        return {
            ...state,
            user: action.payload.user
        };
    },
    GET_USER(state, action: IReduxAction) {
        return {
            user: state.user
        };
    }
}, defaultState);
