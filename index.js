const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()

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

        // Review API

        app.post('/review', async (req, res) => {
            const body = req.body;
            console.log(body)
            const result = await reviewCollection.insertOne(body)
            res.send(result)
        })
        app.get('/review', async (req, res) => {
            const email = req.query.email;
            const id = req.query.serviceId;
            console.log(email, id);
            let query = {};
            if (req.query.email || req.query.serviceId) {
                query = {
                    customerEmail: req.query.email,
                    serviceID: req.query.serviceId
                }
            }
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray()
            res.send(review)

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