import { createStore } from 'redux'
import formApp from './reducers'

const store = createStore(formApp);
export default store;
