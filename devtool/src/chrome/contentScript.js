import {CONTENT_SCRIPT_NAME} from './constants';
import {addForm, addFormField, updateFormFieldValue} from '../redux/actions'; 

const port = chrome.runtime.connect({name: CONTENT_SCRIPT_NAME});

function findFormNodes () {
    // get the first form 
    const form = document.querySelector('form');
    sendMessageToBackgroundScript(addForm(form.id));

    // instrument the fields
    const instrumentField = (evt) => {
        sendMessageToBackgroundScript(updateFormFieldValue(form.id, evt.currentTarget.id, evt.currentTarget.value));
    }

    form.querySelectorAll('button').forEach(b=> {
        sendMessageToBackgroundScript(addFormField(form.id, b.id));
        b.addEventListener('click', instrumentField)
    });
    form.querySelectorAll('input').forEach(i=> {
        sendMessageToBackgroundScript(addFormField(form.id, i.id));
        i.addEventListener('input', instrumentField)
    });
}

function sendMessageToBackgroundScript(message) {
    console.log('sending', message);
    port.postMessage(message);
}

console.log('Instrumenting');
findFormNodes();
