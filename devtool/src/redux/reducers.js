import { ADD_FORM, ADD_FORM_FIELD, UPDATE_FORM_VALUE } from './actions';
import { combineReducers } from 'redux';

export const forms = (state = [], action) => {
    switch (action.type) {
        case ADD_FORM:
            return [
                ...state,
                {
                    id: action.payload.formId,
                    fields: []
                }
            ];
        case ADD_FORM_FIELD:
            
            return state.map(form => {                    
                    if (form.id === action.payload.formId) {
                        form.fields = [...form.fields, { id: action.payload.fieldId }];
                    }                 
                    return form;      
                });
        case UPDATE_FORM_VALUE:
            return state.map(form => {    
                    form.fields = form.fields.map(field=> {
                        if (field.id === action.payload.fieldId) {
                            field.value = action.payload.value;                            
                        }    
                        return field;
                    }); 
                    return form;
                });
        default:
            return state;
    }
};

const formInspectorApp = combineReducers({
    forms
})

export default formInspectorApp