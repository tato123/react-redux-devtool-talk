import React from 'react';


export const FormField = ({formId, formValue}) => (
    <div style={{display:'flex', flexDirection: 'row', width: '100%', borderBottom: '1px solid black'}}>    
        <div style={{width:'200px'}}>
            <label>Field:</label>    
            <strong>{formId}</strong>
        </div>
        <div >
            <label>Value:</label>
            <label>{formValue}</label>
        </div>
    </div>
)

FormField.defaultProps = {
    formValue: 'No Value'
}

export const FormDetail = ({form}) => (
     <div>
         <h1>{form.id}</h1>
         <div style={{marginLeft:'20px'}}>             
            {form.fields.map((aField, id)=> (
                <FormField key={id} formId={aField.id} formValue={aField.value}/>
            ))}
        </div>
    </div>
)

export const FormList = ({forms}) => (
    <div>
        {forms.map( (val, id)=> (
           <FormDetail key={id} form={val}/>
        ))}
    </div>
);

