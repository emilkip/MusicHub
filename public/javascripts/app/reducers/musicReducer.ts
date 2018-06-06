import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import {IMusic} from "../common/interfaces";

interface IDefaultState {
    status: string
    musicList: any[]
    currentMusic: IMusic
}

const defaultState: IDefaultState = {
    status: 'IDLE',
    musicList: [],
    currentMusic: {} as any
};


export function musicReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        CHANGE_MUSIC_LIST_STATUS(): IDefaultState {
            return {
                ...state,
                status: action.payload.status
            }
        },
        CREATE_MUSIC(): IDefaultState {
            return {
                ...state,
                status: 'CREATING'
            }
        },
        SET_CURRENT_MUSIC(): IDefaultState {
            return {
                ...state,
                currentMusic: action.payload.music
            };
        },
        PUSH_MUSIC(): IDefaultState {
            return {
                ...state,
                musicList: [...state.musicList, action.payload.music]
            };
        },
        PUT_MULTIPLE_MUSIC(): IDefaultState {
            return {
                ...state,
                musicList: [...action.payload.musicList]
            };
        },
        RESET_CURRENT_MUSIC(): IDefaultState {
            return {
                ...state,
                currentMusic: {} as any
            }
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}
