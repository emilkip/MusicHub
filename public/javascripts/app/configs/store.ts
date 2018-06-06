import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/musicSaga'
import reducer from './reducer'


const sagaMiddleware = createSagaMiddleware();


const appStore: any = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default appStore;
