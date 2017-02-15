import React from 'react';


export const FormField = ({id}) => (
    <div>
    <label>my id is {id}</label>
    </div>
)

export const Form = ({form}) => (
     <div>
        {form.fields.map((aField, id)=> (
            <FormField key={id} id={aField.id} />
        ))}
    </div>
)

export const FormList = ({forms}) => (
    <div>
        {forms.map( val=> (
           <Form form={val}/>
        ))}
    </div>
);

