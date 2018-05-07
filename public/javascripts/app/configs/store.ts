import { createStore } from 'redux'
import reducer from './reducer'


const appStore: any = createStore(reducer);

export default appStore;