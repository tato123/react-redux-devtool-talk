// Devtools backgorund script that coordinates between the
// actual page and the devtools
// @see https://developer.chrome.com/extensions/devtools

const connections = {};
const CONTENT_SCRIPT_NAME = 'form_contentscript';
const DEVTOOL_NAME = 'form_devtool';

// message handler
const extensionListener = (message, port, sendResponse) => {
    // check if we have an output stream and forward the message
    if (connections[port.sender.tab.id] && connections[port.sender.tab.id].out) {
        connections[port.sender.tab.id].out.postMessage(message);
    }

    // save a copy of the current stream
    if (connections[port.sender.tab.id] && connections[port.sender.tab.id].data) {
        connections[port.sender.tab.id].data.push(message);
    }
};

// binds a new runtime listener when connect is called from content script or 
// from a devtools script
chrome.runtime.onConnect.addListener((port) => {
    // connect as a content script
    if (port.name === CONTENT_SCRIPT_NAME) {
        const tabId = port.sender.tab.id;
        // if the output channel is still open the user still has the devtools open
        // and just refreshed the page, tell the channel to clear its data
        if (connections[tabId]) {
            // if the output channel is still open then just clear it            
            connections[tabId].out && connections[tabId].out.postMessage({ type: 'PAGE_REFRESH' });
            console.warn('Existing connection!! User likely performed a refresh, cleaning up....');
        }
        connections[tabId] = Object.assign({}, connections[tabId], {
            in: port,
            data: []
        });
    }

    // connect as extension
    if (port.name.indexOf(DEVTOOL_NAME) !== -1) {
        const tabId = port.name.split('-')[1];
        connections[tabId] = Object.assign({}, connections[tabId], {
            out: port
        });

        // replay the current state, this is all you get!!!!
        const data = connections[tabId].data || [];
        const out = connections[tabId].out;
        out.postMessage(data);
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);
        // just remove this tabs output channel
        if (port.name.indexOf(DEVTOOL_NAME) !== -1) {
            const tabId = port.name.split('-')[1];
            // can get disconnect for a tab but not be this port
            if (connections[tabId] &&
                connections[tabId].hasOwnProperty('out') &&
                (connections[tabId].out == port)) {
                console.log('Disconnecting', port.name);
                delete connections[tabId].out;
            }
        }
        // we no longer have a source, remove the connection completly
        if (port.name === CONTENT_SCRIPT_NAME) {
            const tabId = port.sender.tab.id;
            if (connections[tabId] &&
                connections[tabId].hasOwnProperty('in') &&
                (connections[tabId].in == port)) {
                console.log('Disconnecting', port.name);
                delete connections[tabId].in;
                delete connections[tabId].data;
            }
        }
    });


});
