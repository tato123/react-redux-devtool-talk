import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// normal store configuration part
const store = configureStore();

// react-dom rendering
render(
    <Provider store={store}>
        <App isSplit={false}/>
    </Provider>,
    document.getElementById('root')
);

// hook to our background script
const port = chrome.runtime.connect({name: `pendo_extension-${chrome.devtools.inspectedWindow.tabId}` });

port.onMessage.addListener((msg) => {
if (_.isArray(msg)) {
    msg.map(action => store.dispatch(action));
}
else if (_.isObject(msg)) {
    store.dispatch(msg);
}
else {
    console.error(`Unsure how to handle ${msg}?`);
}
});
