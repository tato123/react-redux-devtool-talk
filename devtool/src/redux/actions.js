export const ADD_FORM = 'ADD_FORM';
export const ADD_FORM_FIELD = 'ADD_FORM_FIELD';
export const UPDATE_FORM_VALUE = 'UPDATE_FORM_FIELD';


export const addForm = (formId) => ({
    type: ADD_FORM,
    payload: {
        formId
    }
});

export const addFormField = (formId, fieldId) => ({
    type: ADD_FORM_FIELD,
    payload: {
        formId,
        fieldId
    }
});

export const updateFormFieldValue = (formId, fieldId, value) => ({
    type: UPDATE_FORM_VALUE,
    payload: {
        formId,
        fieldId,
        value
    }
});

