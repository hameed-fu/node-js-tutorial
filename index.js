const http = require('http');

const productData = require('./products.json')

const fs  = require('fs');


const express = require('express');
const app = express()

app.use(express.json())

const port = 8000

app.get('/', (req, res) => {
    return res.sendFile(__dirname + "/index.html");
    // return res.json('Welcome Home page')
    
});

app.get('/about', (req, res) => {
    console.log(req.headers)
    return res.end(`Welcome about page ${req.query.name}`)
})

app.get('/contact', (req, res) => {
     
    console.log("Request received", Date.now(),req.ip, req.headers)
    return res.end('Welcome contact')
})



// Apis

app.get('/api/products', (req, res) => {
    return res.json(
        {
            message:'All Products',
            data: productData,
        }
    ).status(201)
 
})


app.post('/api/products/add', (req, res) => {

    let data = req.body
    let title = req.body.title
    let description = req.body.description
    console.log(data)
 
    return res.json({
        // 'title': title,
        // 'description': description,
        data: data
    })
})


app.delete('/api/product/delete/:id', (req, res) => {

    let id  = req.params.id;
    return res.json({
        'message': `delete pending ${id}`
    })
})


app.get('/api/users', (req, res) => {
    return res.json({message:'All Users', data:[], status: 'OK'}).status(200)
})


app.listen(port, () => console.log('server is running on port 8000'))