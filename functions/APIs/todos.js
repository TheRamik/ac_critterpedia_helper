//todos.js

exports.getAllTodos = (request, response) => {
    todos = [
        {
            'id': '1',
            'title': 'greeting',
            'body': 'Hello world from ricky'
        },
        {
            'id': '2',
            'title': 'greeting2',
            'body': 'Hello world from ricky 2'
        }
    ]
    return response.json(todos);
}