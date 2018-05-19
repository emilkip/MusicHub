import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IMusic} from "../common/interfaces";

function shuffleMusicList(list: IMusic[] = [], currentMusic: IMusic): IMusic[] {
    if (currentMusic._id) {
        list = list.filter((music) => music._id !== currentMusic._id);
    }
    for (let i = 0, len = list.length; i < len; i++) {
        const newPosition: number = Math.floor(Math.random() * (len - i)) + i;
        [list[i], list[newPosition]] = [list[newPosition], list[i]];
    }

    if (currentMusic._id) list.unshift(currentMusic);
    return list;
}


interface IDefaultState {
    baseMusicList: IMusic[]
    musicList: IMusic[]
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}

const defaultState: IDefaultState = {
    baseMusicList: [],
    musicList: [],
    playedMusic: {
        music: {} as any,
        playing: false
    }
};


export function playerQueueReducer(state: IDefaultState = defaultState, action: IReduxAction): IDefaultState {

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
                baseMusicList: [...state.baseMusicList, action.payload.music],
                musicList: [...state.musicList, action.payload.music]
            };
        },
        REMOVE_MUSIC_FROM_QUEUE(): IDefaultState {
            const filteredMusicList: IMusic[] = state.musicList.filter((music) => music._id !== action.payload.musicId);

            return {
                ...state,
                baseMusicList: [...filteredMusicList],
                musicList: [...filteredMusicList]
            };
        },
        PLAY_ONE(): IDefaultState {
            const musicInList: any = state.musicList.find((music) => music._id === action.payload.music._id);

            if (musicInList) return state;

            return {
                ...state,
                musicList: [action.payload.music],
                baseMusicList: [action.payload.music]
            };
        },
        PLAY_NEXT(): IDefaultState {
            if (!state.musicList.length) return state;

            const currentMusicIndex: number = state.musicList.findIndex((music) => music._id === state.playedMusic.music._id);
            const nextMusicIndex: number = currentMusicIndex + 1;

            return {
                ...state,
                playedMusic: {
                    music: nextMusicIndex === state.musicList.length ? state.musicList[0] : state.musicList[(nextMusicIndex) % state.musicList.length],
                    playing: true
                }
            };
        },
        PLAY_PREV(): IDefaultState {
            if (!state.musicList.length) return state;
            const currentMusicIndex: number = state.musicList.findIndex((music) => music._id === state.playedMusic.music._id);
            const prevMusicIndex: number = currentMusicIndex - 1;
            return {
                ...state,
                playedMusic: {
                    music: prevMusicIndex < 0 ? state.musicList[0] : state.musicList[prevMusicIndex],
                    playing: true
                }
            };
        },
        TOGGLE_SHUFFLE_QUEUE(): IDefaultState {
            let musicList: IMusic[] = [];

            if (action.payload.shuffle) {
                debugger
                musicList = shuffleMusicList([...state.baseMusicList], state.playedMusic.music);
            } else {
                musicList = state.baseMusicList;
            }

            return {
                ...state,
                musicList
            }
        },
        CHANGE_MUSIC_STATUS(): IDefaultState {
            return {
                ...state,
                playedMusic: {
                    music: action.payload.music,
                    playing: action.payload.playing
                }
            };
        },
        FETCH_QUEUE_STATUS(): IDefaultState {
            return state;
        }
    };

    if (!(action.type in actions)) return state;

    return actions[action.type]();
}
