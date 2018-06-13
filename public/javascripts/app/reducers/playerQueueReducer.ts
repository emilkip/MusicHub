import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IMusic} from "../common/interfaces";
import {handleActions} from "redux-actions";

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


export const playerQueueReducer = handleActions({
    GET_QUEUE(state, action: IReduxAction) {
        return {
            ...state,
            musicList: state.musicList
        };
    },
    PUSH_MUSIC_TO_QUEUE(state, action: IReduxAction) {
        const musicInList: any = state.musicList.find((music: IMusic) => music._id === action.payload.music._id);

        if (musicInList) return state;

        return {
            ...state,
            baseMusicList: [...state.baseMusicList, action.payload.music],
            musicList: [...state.musicList, action.payload.music]
        };
    },
    REMOVE_MUSIC_FROM_QUEUE(state, action: IReduxAction) {
        const filteredMusicList: IMusic[] = state.musicList.filter((music: IMusic) => music._id !== action.payload.musicId);

        return {
            ...state,
            baseMusicList: [...filteredMusicList],
            musicList: [...filteredMusicList]
        };
    },
    PLAY_MANY(state, action: IReduxAction) {
        return {
            ...state,
            musicList: action.payload.musicList,
            baseMusicList: action.payload.musicList,
            playedMusic: {
                music: action.payload.musicList[0],
                playing: true
            }
        };
    },
    PLAY_ONE(state, action: IReduxAction) {
        const musicInList: any = state.musicList.find((music: IMusic) => music._id === action.payload.music._id);

        if (musicInList) return state;

        return {
            ...state,
            musicList: [action.payload.music],
            baseMusicList: [action.payload.music]
        };
    },
    PLAY_NEXT(state, action: IReduxAction) {
        if (!state.musicList.length) return state;

        const currentMusicIndex: number = state.musicList.findIndex((music: IMusic) => music._id === state.playedMusic.music._id);
        const nextMusicIndex: number = currentMusicIndex + 1;

        return {
            ...state,
            playedMusic: {
                music: nextMusicIndex === state.musicList.length ? state.musicList[0] : state.musicList[(nextMusicIndex) % state.musicList.length],
                playing: true
            }
        };
    },
    PLAY_PREV(state, action: IReduxAction) {
        if (!state.musicList.length) return state;
        const currentMusicIndex: number = state.musicList.findIndex((music: IMusic) => music._id === state.playedMusic.music._id);
        const prevMusicIndex: number = currentMusicIndex - 1;
        return {
            ...state,
            playedMusic: {
                music: prevMusicIndex < 0 ? state.musicList[0] : state.musicList[prevMusicIndex],
                playing: true
            }
        };
    },
    TOGGLE_SHUFFLE_QUEUE(state, action: IReduxAction) {
        let musicList: IMusic[] = [];

        if (action.payload.shuffle) {
            musicList = shuffleMusicList([...state.baseMusicList], state.playedMusic.music);
        } else {
            musicList = state.baseMusicList;
        }

        return {
            ...state,
            musicList
        }
    },
    CHANGE_MUSIC_STATUS(state, action: IReduxAction) {
        return {
            ...state,
            playedMusic: {
                music: action.payload.music,
                playing: action.payload.playing
            }
        };
    },
    FETCH_QUEUE_STATUS(state, action: IReduxAction): IDefaultState {
        return state;
    }
}, defaultState);
