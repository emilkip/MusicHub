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


export default {
    getQueue,
    pushMusicToQueue,
    playOne
}
