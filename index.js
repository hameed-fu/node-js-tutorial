const http = require('http');

const url = require('url');


const express = require('express');
const app = express()

const port = 8000

app.get('/', (req, res) => {
    return res.json('Welcome Home page')
    
});

app.get('/about', (req, res) => {
    console.log(req.headers)
    return res.end(`Welcome about page ${req.query.name}`)
})

app.get('/contact', (req, res) => {
    
    console.log("Request received", Date.now(),req.ip, req.headers)
    return res.end('Welcome contact')
})


app.listen(port, (e) => console.log('server is running on port 8000'))