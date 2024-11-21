const express = require('express');
const app = express()


app.use(express.json())
// app.use(express.urlencoded({ extended: false}))
const port = 8000

const { MongoClient } = require('mongodb');

const dburl = 'mongodb://localhost:27017';
const database = 'ets'
const database1 = 'ets'

const userTable = 'users'
const proudctTable = 'products'

const client = new MongoClient(dburl);

async function run() {
    try {
        // Connect to the MongoDB server
        await client.connect();


        const db = client.db(database);
        const collections = await db.listCollections().toArray(); // show all tables(collection)

        const userCollection = await db.collection(userTable); // select a collection(users, products etc)
        const userData = await userCollection.find().toArray();
        
        console.log('Table selected', userData);

 
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        await client.close();
    }
}


run().catch(console.dir);


app.get('/', (req, res) => {
   return res.json({
    'message': 'Welcome'
   })
});


app.get('/api/users', async (req, res) => {

    await client.connect();
    const db = client.db(database);


    const userCollection = await db.collection(userTable); // select the user collection (table)
    const userData = await userCollection.find({}).toArray();
    
     
    return res.json({message:'All Users', data:userData, status: 'OK'}).status(200)
})



app.get('/api/products', async (req, res) => {

    await client.connect();
    const db = client.db(database);


    const userCollection = await db.collection(proudctTable); // select the user collection (table)
    const productData = await userCollection.find({}).toArray();
    
     
    return res.json({message:'All Products', data:productData, status: 'OK'}).status(200)
})




app.listen(port, () => console.log('server is running on port 8000'))