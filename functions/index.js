 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

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

const {
    getAllFishes,
    getActiveFishes,
    postOneFish,
    uploadFishPhoto,
    deleteFish,
    editFish,
} = require('./APIs/fishes');

app.get('/fishes', getAllFishes);
app.get('/activeFishes', getActiveFishes);
app.post('/fish', postOneFish);
app.post('/fish/image/:docId', uploadFishPhoto);
app.delete('/fish/:docId', deleteFish);
app.put('/fish/:docId', editFish);

// Users
const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetails,
    updateUserDetails,
} = require('./APIs/users')

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetails);
app.put('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
