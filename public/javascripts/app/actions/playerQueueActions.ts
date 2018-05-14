import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IMusic} from "../common/interfaces";


export function getQueue(musicList: IMusic[]): IReduxAction {
    return {
        type: 'GET_QUEUE',
        payload: {
            musicList
        }
    }
}

export function pushMusicToQueue(music: IMusic): IReduxAction {
    return {
        type: 'PUSH_MUSIC_TO_QUEUE',
        payload: {
            music
        }
    }
}

export function playOne(music: IMusic): IReduxAction {
    return {
        type: 'PLAY_ONE',
        payload: {
            music
        }
    }
}

export function playNext(shuffle: boolean): IReduxAction {
    return {
        type: 'PLAY_NEXT',
        payload: {}
    }
}

export function playPrev(): IReduxAction {
    return {
        type: 'PLAY_PREV',
        payload: {}
    }
}

export function toggleShuffle(shuffle: boolean): IReduxAction {
    return {
        type: 'TOGGLE_SHUFFLE_QUEUE',
        payload: {
            shuffle
        }
    }
}

export function changeMusicStatus(music: IMusic, playing: boolean): IReduxAction {
    return {
        type: 'CHANGE_MUSIC_STATUS',
        payload: {
            music,
            playing
        }
    }
}


export default {
    getQueue,
    pushMusicToQueue,
    playNext,
    playOne,
    changeMusicStatus
}
