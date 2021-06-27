const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { checkForClientError } = require("../utils");

const collection = fetchdb().collection("accounts");

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
                email: "email string",
                passwordHash: "32 char hash",
                tier: "tier name",
                currentSchedule: "schedule name or null"
            }
        });

        await collection.insertOne(req.body);
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post("/:id", async function(req, res, next) {
    try {
        checkForClientError(req, {
            body: {
                email: "email string",
                passwordHash: "32 char hash",
                tier: "tier name",
                currentSchedule: "schedule name or null"
            }
        });

        await collection.insertOne({ _id: ObjectID(req.params.id), ...req.body });
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async function(req, res, next) {
    try {
        checkForClientError(req, {
            body: {
                email: "email string",
                passwordHash: "32 char hash",
                tier: "tier name",
                currentSchedule: "schedule name or null"
            }
        });

        await collection.replaceOne({ _id: ObjectID(req.params.id)}, { _id: ObjectID(req.params.id), ...req.body }, { upsert: true });
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", async function(req, res, next) {
    try {
        await collection.updateOne({ _id: ObjectID(req.params.id) }, {$set: req.query});
    
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