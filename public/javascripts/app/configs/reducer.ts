import {combineReducers} from 'redux';
import {albumReducer} from '../reducers/albumReducer';
import {authorReducer} from '../reducers/authorReducer';
import {musicReducer} from '../reducers/musicReducer';
import {searchResultReducer} from '../reducers/searchResultReducer';
import {playerReducer} from '../reducers/playerReducer';
import {playbackQueueReducer} from '../reducers/playbackQueueReducer';


const appReducers = combineReducers({
    albumReducer,
    authorReducer,
    musicReducer,
    searchResultReducer,
    playerReducer,
    playbackQueueReducer
});

export default appReducers;
