const functions = require('firebase-functions');
const app = require('express')();
 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

const {
    getAllTodos
} = require('./APIs/todos');
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//});

app.get('/todos',getAllTodos);
exports.api = functions.https.onRequest(app);
