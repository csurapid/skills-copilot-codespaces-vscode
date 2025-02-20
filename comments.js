// Create web server that listens on port 3000
// Create a route that listens for POST requests to /comments
// When a POST request is made, add the comment to the comments array
// When a GET request is made to /comments, return the comments array in the response

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const comments = [];

app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.send('Comment added');
});

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

// POST request
// curl -X POST -d '{"comment": "hello"}' -H 'Content-Type: application/json' http://localhost:3000/comments

// GET request
// curl http://localhost:3000/comments

// {
//     "comment": "hello"
// }