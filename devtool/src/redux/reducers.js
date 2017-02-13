import {ADD_ACTION_TYPE} from './actions';

const initialState = {
    val: 0
};

const calculatorReducer = (state = initialState, action) => {
    switch (action) {
        case ADD_ACTION_TYPE:
            return Object.assign({}, state, {
                val: action.payload.val + state.d
            });
        default:
            return state;
    }
};