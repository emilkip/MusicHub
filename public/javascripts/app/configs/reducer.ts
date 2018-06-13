import {combineReducers} from 'redux';
import {
    albumReducer,
    authorReducer,
    musicReducer,
    searchResultReducer,
    playerQueueReducer,
    profileReducer,
    playlistReducer
} from '../reducers';


const appReducers = combineReducers({
    albumReducer,
    authorReducer,
    musicReducer,
    searchResultReducer,
    playerQueueReducer,
    profileReducer,
    playlistReducer
});

export default appReducers;
