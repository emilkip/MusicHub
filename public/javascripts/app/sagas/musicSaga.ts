import {fork, call, put, takeEvery} from "redux-saga/effects";
import MusicService from "../services/MusicService";
import {putMultipleMusic, pushMusic, setCurrentMusic, changeMusicListStatus} from "../actions/musicActions";
import toast from "../common/utils/toast";
import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import history from "../configs/history";



function* musicAllHandler() {
    try {
        const musicList = yield call(MusicService.getAll);
        yield put(putMultipleMusic(musicList.data));
    } catch (err) {
        toast.error(err.message || err);
    }
}

function* musicOneHandler(action: IReduxAction) {
    try {
        const music = yield call(MusicService.getByID, action.payload.id);
        yield put(setCurrentMusic(music.data));
    } catch (err) {
        toast.error(err.message || err);
    }
}

function* musicCreateHandler(action: IReduxAction) {
    try {
        const createdTrack = yield call(MusicService.create, action.payload.music);
        yield put(pushMusic(createdTrack.data));
        toast.error('Music successfully created');
        history.push('/');
    } catch (err) {
        toast.error(err.response.data.message || err.response.data);
    } finally {
        put(changeMusicListStatus('IDLE'));
    }
}


function* musicAllWatcher() {
    yield takeEvery('REQUEST_MUSIC_LIST', musicAllHandler);
}

function* musicOneWatcher() {
    yield takeEvery('REQUEST_MUSIC_BY_ID', musicOneHandler);
}

function* musicCreateWatcher() {
    yield takeEvery('CREATE_MUSIC', musicCreateHandler);
}

export default function* musicSaga() {
    yield [
        fork(musicAllWatcher),
        fork(musicOneWatcher),
        fork(musicCreateWatcher)
    ];
}
