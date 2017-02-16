import {applyMiddleware, createStore } from 'redux'
import formApp from './reducers'
import {addForm, addFormField, updateFormFieldValue} from './actions';
import createLogger from 'redux-logger';

const logger = createLogger();
const store = createStore(formApp, applyMiddleware(logger));
export default store;