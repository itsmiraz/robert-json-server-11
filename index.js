const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()

const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fpgnyx0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Server Is Runnig')
})

app.listen(port, () => {
    console.log(`server is running on port${port}`)
})