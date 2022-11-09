const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const jwt = require('jsonwebtoken');


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fpgnyx0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {

        const serviceCollection = client.db('RobertJsonService').collection('services')
        const reviewCollection = client.db('ServiceReview').collection('reviews')

        // jwt api
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.send({ token })
        })

        // service API
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await serviceCollection.findOne(query)
            res.send(result)
        })
        app.post('/services', async (req, res) => {
            const body = req.body;
            const result = await serviceCollection.insertOne(body)
            res.send(result)
        })

        // Review API

        app.post('/review', async (req, res) => {
            const body = req.body;
            const result = await reviewCollection.insertOne(body)
            res.send(result)
        })

        app.get('/review', async (req, res) => {
            let query = {};
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray()
            res.send(review)

        })
        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.findOne(query)
            res.send(result)
        })
        app.put('/review/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const body = req.body;
            const option = { upsert: true }
            const updateUser = {
                $set: {
                    review: body.review,
                }
            }
            const result = await reviewCollection.updateOne(filter, updateUser, option)
            res.send(result)
        })
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        })

    }
    finally {

    }

}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Server Is Runnig')
})

app.listen(port, () => {
    console.log(`server is running on port${port}`)
})