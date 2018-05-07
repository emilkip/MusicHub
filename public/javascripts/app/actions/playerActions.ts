import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import {IMusic} from "../common/interfaces";


export function playMusic(music: IMusic): IReduxAction {
    return {
        type: 'PLAY_MUSIC',
        payload: {
            music
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

export function fetchPlayerStatus(): IReduxAction {
    return {
        type: 'FETCH_PLAYER_STATUS',
        payload: {}
    }
}


export default {
    playMusic,
    changeMusicStatus,
    fetchPlayerStatus
}
