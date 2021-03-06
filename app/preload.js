const { contextBridge, ipcRenderer } = require('electron');
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ["create-customer"];

        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ["create-customer-success"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    fetchallCustomers: async (params) => {
        console.log("ipc called")
        return await ipcRenderer.invoke('fetchall-customers', params)
    },
    searchCustomers: async (params) => {
        return await ipcRenderer.invoke('search-customers', params)
    }
}
);
