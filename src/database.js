const { MongoClient } = require("mongodb");
const { databaseName } = require("./config");

const client = new MongoClient(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});



module.exports = {
    connect: async function() {
        try {
            await client.connect();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    disconnect: async function() {
        try {
            await client.close();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    fetchdb: function() {
        return client.db(databaseName);
    }
};