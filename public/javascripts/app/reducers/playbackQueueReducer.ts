import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IMusic} from "../common/interfaces";

interface IDefaultState {
    musicList: IMusic[]
}

const defaultState: IDefaultState = {
    musicList: []
};


export function playbackQueueReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        GET_QUEUE(): IDefaultState {
            return {
                ...state,
                musicList: state.musicList
            };
        },
        PUSH_MUSIC_TO_QUEUE(): IDefaultState {
            const musicInList: any = state.musicList.find((music) => music._id === action.payload.music._id);

            if (musicInList) return state;

            return {
                ...state,
                musicList: [...state.musicList, action.payload.music]
            };
        },
        PLAY_ONE(): IDefaultState {
            const musicInList: any = state.musicList.find((music) => music._id === action.payload.music._id);

            if (musicInList) return state;

            return {
                ...state,
                musicList: [action.payload.music]
            };
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}
