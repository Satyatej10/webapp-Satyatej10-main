const { MongoClient } = require('mongodb');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const fs = require('fs');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function uploadData() {
    try {
        await client.connect();

        const database = client.db('RestaurentList');
        const collection = database.collection('Restaurents');

        const data = JSON.parse(fs.readFileSync('./file5.json', 'utf8'));
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted.`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

uploadData();