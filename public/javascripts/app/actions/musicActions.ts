import { IReduxAction } from "../common/interfaces/CommonInterfaces";
import {IMusic} from "../common/interfaces";


export function requestMusicById(id: string): IReduxAction {
    return {
        type: 'REQUEST_MUSIC_BY_ID',
        payload: {
            id
        }
    }
}

export function putMultipleMusic(musicList: IMusic[]): IReduxAction {
    return {
        type: 'PUT_MULTIPLE_MUSIC',
        payload: {
            musicList
        }
    }
}

export function setCurrentMusic(music: IMusic): IReduxAction {
    return {
        type: 'SET_CURRENT_MUSIC',
        payload: {
            music
        }
    }
}

export function pushMusic(music: IMusic): IReduxAction {
    return {
        type: 'PUSH_MUSIC',
        payload: {
            music
        }
    }
}

export function createMusic(music: any): IReduxAction {
    return {
        type: 'CREATE_MUSIC',
        payload: {
            music
        }
    }
}

export function changeMusicListStatus(status: string): IReduxAction {
    return {
        type: 'CHANGE_MUSIC_LIST_STATUS',
        payload: {
            status
        }
    }
}

export function resetCurrentMusic() {
    return {
        type: 'RESET_CURRENT_MUSIC',
        payload: {}
    }
}


export default {
    requestMusicById,
    putMultipleMusic,
    setCurrentMusic,
    pushMusic,
    createMusic,
    changeMusicListStatus,
    resetCurrentMusic
}
