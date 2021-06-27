const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { checkForClientError } = require("../utils");

const collection = fetchdb().collection("stripeCustomers");

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
                accountId: "accountId string",
                customerId: "schedule name"
            }
        });

        await collection.insertOne({
            accountId: new ObjectID(req.body.accountId),
            customerId: req.body.customerId
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
                accountId: "accountId string",
                customerId: "schedule name"
            }
        });

        await collection.insertOne({
            _id: new ObjectID(req.params.id),
            accountId: new ObjectID(req.body.accountId),
            customerId: req.body.customerId
        });
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async function(req, res, next) {
    try {
        checkForClientError(req, {
            body: {
                accountId: "accountId string",
                customerId: "schedule name"
            }
        });

        await collection.replaceOne({ _id: new ObjectID(req.params.id) }, {
            _id: new ObjectID(req.params.id),
            accountId: new ObjectID(req.body.accountId),
            customerId: req.body.customerId
        }, { upsert: true });
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", async function(req, res, next) {
    try {
        await collection.updateOne({ _id: new ObjectID(req.params.id) }, {$set: req.query});
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async function(req, res, next) {
    try {
        await collection.deleteOne({ _id: new ObjectID(req.params.id) });
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;