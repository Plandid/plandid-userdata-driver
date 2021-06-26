const { MongoClient } = require("mongodb");
const fs = require("fs");

const url = process.argv[2];

if (!url) {
    console.error("No mongodb database url given");
    process.exit(1);
}

const { databaseName } = JSON.parse(fs.readFileSync("./config.json"));

(async function() {
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

    await client.connect();
    const db = client.db(databaseName);

    await db.dropDatabase();

    await client.close();

    console.log(`Database ${databaseName} has been deleted.`)
    process.exit(0);
})()