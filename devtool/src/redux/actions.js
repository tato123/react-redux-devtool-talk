export const ADD_ACTION_TYPE = 'add';

export const add = (val) => ({
    type: ADD_ACTION,
    payload: {
        val: val
    }
});

