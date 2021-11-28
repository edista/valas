// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})

var createCustomer = function (data) {
    window.api.send("create-customer", data)
}

createCustomer({ name: "Edi Surata" })