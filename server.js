const express = require('express');
const app = express()

const { dbConnection } = require('./connection');
const { ObjectId } = require('mongodb');
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
const port = 8000



app.get('/', (req, res) => {
   return res.json({
    'message': 'Welcome'
   })
});


app.get('/api/users',  async (req, res) => {
    const db = await dbConnection();
    
    const userCollection =  db.collection("users");
    const userData = await userCollection.find({}).toArray();
    
    return res.json({message:'All Users', data: userData, status: 'OK'}).status(200)
})


app.delete('/api/user/delete/:id', async (req, res) => {
    try {
        const db = await dbConnection();
        const userId = req.params.id;

        const userCollection = db.collection("users"); // select user collection 
        const deleteResult = await userCollection.deleteOne({ _id: new ObjectId(userId) });
 

        if (deleteResult.deletedCount === 1) {
            return res.status(200).json({
                message: `Record with ID ${userId} deleted successfully.`,
                data: userId,
                status: "OK"
            });
        } else {
            return res.status(404).json({
                message: `No record found with ID ${userId}.`,
                data: userId,
                status: "NOT_FOUND"
            });
        }
    } catch (err) {
        console.error('Error deleting record:', err);
        return res.status(500).json({
            message: 'Error deleting record',
            error: err.message,
            status: "ERROR"
        });
    }
});


app.post('/api/user/add',  async (req, res) => {
    const db = await dbConnection();

    let name = req.body.name
    let role = req.body.role
    let hobby = req.body.hobby ? req.body.hobby : "None";
    
    const userCollection = await db.collection("users"); // select the user collection (table)
    const userData = await userCollection.insertOne({
        name: name,
        role: role,
        hobby: hobby
    });
    
    return res.json({message:'User Created', data:[], status: 'OK'}).status(200)
})






app.get('/api/products',  async (req, res) => {
    const db = await dbConnection();
    
    const userCollection = await db.collection("products"); // select the user collection (table)
    const productData = await userCollection.find({}).toArray();
    
    return res.json({message:'All Products', data:productData, status: 'OK'}).status(200)
})




app.listen(port, () => console.log('server is running on port 8000'))