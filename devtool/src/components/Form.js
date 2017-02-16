import React from 'react';


export const FormField = ({formId, formValue}) => (
    <div>        
        <label>{formId}</label>
        <label>{formValue}</label>
    </div>
)

export const FormDetail = ({form}) => (
     <div>
        {form.fields.map((aField, id)=> (
            <FormField key={id} formId={aField.id} formValue={aField.value}/>
        ))}
    </div>
)

export const FormList = ({forms}) => (
    <div>
        {forms.map( (val, id)=> (
           <FormDetail key={id} form={val}/>
        ))}
    </div>
);

