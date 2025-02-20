//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const comments = require('./comments.json');
const uuid = require('uuid');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//add comments
app.post('/comments', (req, res) => {
    const newComment = {
        id: uuid.v4(),
        name: req.body.name,
        comment: req.body.comment,
        date: new Date()
    };
    comments.push(newComment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Error writing file');
        }
        res.status(201).send(newComment);
    });
});

//delete comments
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === req.params.id);
    if (!comment) {
        res.status(404).send('Comment not found');
        return;
    }
    comments = comments.filter(c => c.id !== req.params.id);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Error writing file');
        }
        res.status(204).send();
    });
}
);