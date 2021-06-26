const { MongoClient } = require("mongodb");
const fs = require("fs");

const schemas = JSON.parse(fs.readFileSync("./schemas.json"));
const indexes = JSON.parse(fs.readFileSync("./indexes.json"));
const { databaseName } = JSON.parse(fs.readFileSync("./config.json"));

const url = process.argv[2];

if (!url) {
    console.error("No mongodb database url given");
    process.exit(1);
}

(async function() {
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

    await client.connect();
    const db = client.db(databaseName);

    for (let schemaName in schemas) {
        await db.createCollection(schemaName, {
            validator: {
                $jsonSchema: schemas[schemaName]
            }
        });
    }

    for  (const collection in indexes) {
        for (const kvp of indexes[collection]) {
            await db.collection(collection).createIndex(kvp.index, kvp.options);
        }
    }

    await client.close();

    console.log(`Database ${databaseName} has been created.`);
    process.exit(0);
})();