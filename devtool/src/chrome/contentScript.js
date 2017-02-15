import {CONTENT_SCRIPT_NAME} from './constants';

const port = chrome.runtime.connect({name: CONTENT_SCRIPT_NAME});

function instrumentField(evt) {
    sendMessageToBackgroundScript({
        type: 'FORM_FIELD_CHANGE',
        payload: {
            id: evt.currentTarget.id,
            type: evt.currentTarget.tagName.toLowerCase(),
            value: evt.currentTarget.value
        }
    });
}

function findFormNodes () {
    document.querySelectorAll('form button').forEach(b=> b.addEventListener('click', instrumentField));
    document.querySelectorAll('form input').forEach(i=> i.addEventListener('input', instrumentField));
}

function sendMessageToBackgroundScript(message) {
    console.log('sending', message);
    port.postMessage(message);
}

console.log('Instrumenting');
findFormNodes();
