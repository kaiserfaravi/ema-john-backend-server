const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();

const port = process.env.PORT || 4000;

// middleware

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eihqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect();
        // console.log("database conneected successfully");

        const database = client.db('online_Shop');
        const productCollection = database.collection('products');

        // get products api
        app.get('/products', async (req, res) => {
            console.log(req.query);
            // error
            const cursor = productCollection.find({});
            const page = git(req.query.page);
            const size = parseInt(req.query.size);
            // error
            let products;
            // const count = await cursor.count();
            if (page) {
                products = await cursor.skip(page * size).limit(size).toArray();
            }
            else {
                products = await cursor.toArray();
            }


            const count = await cursor.count();

            res.send({
                count,
                products
            });
        })
    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Ema john serrver is running');
});

app.listen(port, (req, res) => {
    console.log('server running at port', port);
})

