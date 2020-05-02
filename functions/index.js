 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const app = require('express')();

// Todos
const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo,
} = require('./APIs/todos');

app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);

// Insects
const {
    getAllInsects,
    getActiveInsects,
    postOneInsect,
    deleteInsect,
    editInsect,
} = require('./APIs/insects');

app.get('/insects', getAllInsects);
app.get('/activeInsects', getActiveInsects);
app.post('/insect', postOneInsect);
app.delete('/insect/:docId', deleteInsect);
app.put('/insect/:docId', editInsect);

// Fishes
/*
const {
    getAllFishes,
    getActiveFishes,
    postOneFish,
    deleteFish,
    editFish,
} = require('./APIs/fishes');

app.get('/fishes',getAllFishes);
app.get('/activeFishes', getActiveFishes);
app.post('/fish', postOneFish);
app.delete('/fish/:fishId', deleteFish);
app.put('/fish/:fishId', editFish);
*/

exports.api = functions.https.onRequest(app);
