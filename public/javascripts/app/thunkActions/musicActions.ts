import {pushMusic, putMultipleMusic, setCurrentMusic, changeMusicListStatus, putGenres} from "../actions/musicActions";
import MusicService from "../services/MusicService";
import toast from "../common/utils/toast";
import history from "../configs/history";
import {INewMusic} from "../common/interfaces";
import {AxiosResponse} from 'axios';


export function fetchMusicList() {
    return async (dispatch: any) => {
        try {
            const musicList: any = await MusicService.getAll();
            dispatch(putMultipleMusic(musicList.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}

export function fetchMusic(id: string) {
    return async (dispatch: any) => {
        try {
            const music: AxiosResponse = await MusicService.getByID(id);
            dispatch(setCurrentMusic(music.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}

export function createMusic(music: INewMusic) {
    return async (dispatch: any) => {
        try {
            const createdTrack: AxiosResponse = await MusicService.create(music);
            dispatch(pushMusic(createdTrack.data));
            toast.success('Music successfully created');
            history.push('/');
        } catch (err) {
            toast.error(err.message || err);
        } finally {
            dispatch(changeMusicListStatus('IDLE'));
        }
    }
}

export function fetchGenres() {
    return async (dispatch: any, getState: any) => {
        const {musicReducer: {genres}}: any = getState();

        if (genres.length) return;

        try {
            const fetchedGenres: AxiosResponse = await MusicService.getGenres();
            dispatch(putGenres(fetchedGenres.data));
        } catch (err) {
            toast.error(err.message || err);
        }
    }
}
