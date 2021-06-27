const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { checkForClientError } = require("../utils");

const collection = fetchdb().collection("onlineAccounts");

const router = express.Router();

router.get("/:id", async function(req, res, next) {
    try {
        let data = await collection.find({ _id: new ObjectID(req.params.id) }).next();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post("/", async function(req, res, next) {
    try {
        checkForClientError(req, {
            body: {
                accountId: "id string",
                dateCreated: 1234,
            }
        });

        await collection.insertOne({
            accountId: new ObjectID(req.body.accountId),
            dateCreated: new Date(req.body.dateCreated), 
        });
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post("/:id", async function(req, res, next) {
    try {
        checkForClientError(req, {
            body: {
                accountId: "id string",
                dateCreated: 1234,
            }
        });

        await collection.insertOne({
            _id: ObjectID(req.params.id), 
            accountId: new ObjectID(req.body.accountId),
            dateCreated: new Date(req.body.dateCreated), 
        });
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async function(req, res, next) {
    try {
        await collection.deleteOne({ _id: ObjectID(req.params.id) });
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;