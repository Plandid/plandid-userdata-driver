const { MongoClient, ObjectID } = require("mongodb");
const { databaseName } = require("./config");
    
const client = new MongoClient(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {
    connect: async function() {
        try {
            await client.connect();
        } catch (error) {
            console.error(error);
            process.exit(1);
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
    },
    ObjectID: ObjectID,
    authorize: async function(name, id) {
        return client.db(databaseName).collection("services").find({_id: id, name: name}, {_id: true, name: true}).limit(1).hasNext();
    }
};