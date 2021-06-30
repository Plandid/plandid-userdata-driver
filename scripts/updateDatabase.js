const { MongoClient } = require("mongodb");
const fs = require("fs");

require("dotenv").config();

const schemas = JSON.parse(fs.readFileSync("./schemas.json"));
const indexes = JSON.parse(fs.readFileSync("./indexes.json"));
const { databaseName } = JSON.parse(fs.readFileSync("./config.json"));

(async function() {
    const client = new MongoClient(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    await client.connect();
    const db = client.db(databaseName);

    for (let schemaName in schemas) {
        try {
            await db.command({
                collMod: schemaName,
                validator: {
                    $jsonSchema: schemas[schemaName]
                }
            });
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
    }

    await client.close();

    console.log(`database ${databaseName} has been updated`);
    process.exit(0);
})();