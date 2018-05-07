import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IMusic} from "../common/interfaces";

interface IDefaultState {
    music: IMusic
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}

const defaultState: IDefaultState = {
    music: {} as any,
    playedMusic: {
        music: {} as any,
        playing: false
    }
};

export function playerReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

    const actions: any = {
        PLAY_MUSIC(): IDefaultState {
            return {
                playedMusic: {
                    music: action.payload.music,
                    playing: true
                },
                music: action.payload.music
            };
        },
        CHANGE_MUSIC_STATUS(): IDefaultState {
            return {
                ...state,
                playedMusic: {
                    music: action.payload.music,
                    playing: action.payload.playing
                }
            }
        },
        FETCH_QUEUE_STATUS(): IDefaultState {
            return state;
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}
