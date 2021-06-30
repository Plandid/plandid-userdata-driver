const { MongoClient } = require("mongodb");
const fs = require("fs");

require("dotenv").config();

const schemas = JSON.parse(fs.readFileSync("./schemas.json"));
const indexes = JSON.parse(fs.readFileSync("./indexes.json"));
const examples = require("../exampleData.js");
const { databaseName } = JSON.parse(fs.readFileSync("./config.json"));

(async function() {
    const client = new MongoClient(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    await client.connect();
    const db = client.db(databaseName);

    for (let schemaName in schemas) {
        try {
            await db.createCollection(schemaName, {
                validator: {
                    $jsonSchema: schemas[schemaName]
                }
            });
            console.log(`created collection: ${schemaName}`);
        } catch (error) {
            console.error(error);
        }
    }

    for (const collection in indexes) {
        for (const kvp of indexes[collection]) {
            try {
                await db.collection(collection).createIndex(kvp.index, kvp.options);
            } catch (error) {
                console.error(error);
            }
        }
        console.log(`created indexes for collection: ${collection}`);
    }

    for (const collection in examples) {
        try {
            await db.collection(collection).insertOne(examples[collection]);
            console.log(`inserted example for collection: ${collection}`);
        } catch (error) {
            console.error(error);
        }
    }

    await client.close();

    console.log(`database: ${databaseName} has been created`);
    process.exit(0);
})();