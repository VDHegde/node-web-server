'use strict';

const express = require('express');
const fs = require('fs');
let app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app .use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.path}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log(log);
    next();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.send({
        name: 'VD',
        likes: [
            'Gaming'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('Listening on 3000');
});