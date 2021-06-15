const { MongoClient } = require("mongodb");
const { databaseName } = require("./config");

const client = new MongoClient(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {
    db: client.db(databaseName),
    connect: async function() {
        try {
            await client.connect();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};