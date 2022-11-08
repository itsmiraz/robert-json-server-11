const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
app.use(cors())

// username : robertjsonAss
// password : Wpd3zZYQHEaJgkZZ


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.fpgnyx0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});



app.get('/', (req, res) => {
    res.send('Server Is Runnig')
})

app.listen(port, () => {
    console.log(`server is running on port${port}`)
})