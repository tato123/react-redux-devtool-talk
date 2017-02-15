import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {DEVTOOL_NAME} from './constants';


// react-dom rendering
render(
    <h1>Hello world</h1>,
    document.getElementById('root')
);

(function listenToBackgroundScript () {
        // hook to our background script
    const port = chrome.runtime.connect({name: `${DEVTOOL_NAME}-${chrome.devtools.inspectedWindow.tabId}`});

    port.onMessage.addListener((msg) => {
        console.log('got a message', msg)
    });
})();
