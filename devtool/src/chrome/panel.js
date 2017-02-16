import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { DEVTOOL_NAME } from './constants';
import FormViewer from '../containers/FormViewer';
import store from '../redux/store';

// react-dom rendering
render(
    <Provider store={store}>
        <FormViewer />
    </Provider>,
    document.getElementById('root')
);

(function listenToBackgroundScript() {
    // hook to our background script
    const port = chrome.runtime.connect({ name: `${DEVTOOL_NAME}-${chrome.devtools.inspectedWindow.tabId}` });

    port.onMessage.addListener((msg) => {
        console.log('got a message', msg)
        if (Array.isArray(msg)) {
            msg.forEach(action => store.dispatch(action));
        }
        else if (typeof msg === 'object') {
            store.dispatch(msg);
        }
        else {
            console.error(`Unsure how to handle ${msg}?`);
        }
    });
})();
