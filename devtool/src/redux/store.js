import {applyMiddleware, createStore } from 'redux'
import formApp from './reducers'
import {addForm, addFormField, updateFormFieldValue} from './actions';
import createLogger from 'redux-logger';

// const initialState = {
//     forms: [
//         {
//             id: 0,
//             fields: [
//                 {
//                     id: '123',
//                     value: 'abc'
//                 },
//                 {
//                     id: '3333',
//                     value: 'cat'
//                 },
//                 {
//                     id: '456',
//                     value: 'ruffle'
//                 }
//             ]
//         }
//     ]
// }
const logger = createLogger();
const store = createStore(formApp, applyMiddleware(logger));


store.dispatch(addForm('crazyForm'));

// add fields
store.dispatch(addFormField('crazyForm', 'crazybutton'));
store.dispatch(addFormField('crazyForm', 'crazybutton2'));
store.dispatch(addFormField('crazyForm', 'crazytext'));

// add values
store.dispatch(updateFormFieldValue('crazyForm', 'crazybutton', 'abc'));
store.dispatch(updateFormFieldValue('crazyForm', 'crazybutton2', 'cat'));
store.dispatch(updateFormFieldValue('crazyForm', 'crazytext', 'ruffle'));

export default store;