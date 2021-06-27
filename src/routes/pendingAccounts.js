const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { checkForClientError } = require("../utils");

const collection = fetchdb().collection("pendingAccounts");

const router = express.Router();

router.get("/:id", async function(req, res, next) {
    try {
        let data = await collection.find({_id: new ObjectID(req.params.id)}).next();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post("/", async function(req, res, next) {
    try {
        checkForClientError(req, {
            body: {
                dateCreated: 1234,
                email: "example@mail.com",
                passwordHash: "32 char hash",
            }
        });

        await collection.insertOne({
            dateCreated: new Date(req.body.dateCreated), 
            email: req.body.email, 
            passwordHash: req.body.passwordHash
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
                dateCreated: 1234,
                email: "example@mail.com",
                passwordHash: "32 char hash",
            }
        });

        await collection.insertOne({
            _id: ObjectID(req.params.id), 
            dateCreated: new Date(req.body.dateCreated), 
            email: req.body.email, 
            passwordHash: req.body.passwordHash
        });
    
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