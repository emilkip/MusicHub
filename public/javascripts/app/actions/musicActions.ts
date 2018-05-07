import { IReduxAction } from "../common/interfaces/CommonInterfaces";


export function getMusic(musicList: any[]): IReduxAction {
    return {
        type: 'GET_MUSIC',
        payload: {
            musicList
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


export default {
    getMusic,
    createMusic
}