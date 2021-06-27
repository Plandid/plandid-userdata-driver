const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { checkForClientError } = require("../utils");

const collection = fetchdb().collection("accounts");

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
    checkForClientError(req, res, expectedBody={
        email: "email string",
        passwordHash: "some hash",
        tier: "tier name",
        currentSchedule: "some schedule name or null"
    }, typecheck=false);

    try {
        await collection.insertOne(req.body);
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async function(req, res, next) {
    checkForClientError(req, res, expectedBody={
        email: "email string",
        passwordHash: "some hash",
        tier: "tier name",
        currentSchedule: "some schedule name or null"
    }, typecheck=false);

    try {
        await collection.updateOne({_id: ObjectID(req.params.id)}, req.body);
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", async function(req, res, next) {
    checkForClientError(req, res, optionalBody={
        email: "email",
        passwordHash: "hash",
        tier: "tier name",
        currentSchedule: "schedule name or null"
    });

    try {
        await collection.updateOne({_id: ObjectID(req.params.id)}, req.body);
    
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;