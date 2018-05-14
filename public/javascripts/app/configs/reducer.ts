import {combineReducers} from 'redux';
import {
    albumReducer,
    authorReducer,
    musicReducer,
    searchResultReducer,
    playerQueueReducer,
    profileReducer
} from '../reducers';


const appReducers = combineReducers({
    albumReducer,
    authorReducer,
    musicReducer,
    searchResultReducer,
    playerQueueReducer,
    profileReducer
});

export default appReducers;
