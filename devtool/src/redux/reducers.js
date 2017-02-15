import {ADD_ACTION_TYPE} from './actions';
import { combineReducers } from 'redux';

const initialState = [
    {
        fields: [
            {
                id: '123'
            },
            {
                id: '3333'
            },
            {
                id: '456'
            }
        ]
    }
]

export const forms = (state = initialState, action) => {
    switch (action) {
        case ADD_ACTION_TYPE:
            return Object.assign({}, state, {
                val: action.payload.val + state.d
            });
        default:
            return state;
    }
};

const formInspectorApp = combineReducers({
  forms
})

export default formInspectorApp