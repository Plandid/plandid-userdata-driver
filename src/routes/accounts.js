const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("accounts");

const router = express.Router();

mongoRestRoutes(router, collection, 
    function(req) {
        let filter = {};

        return filter;
    }, 
    function(req) {
        let record = {
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            tier: req.body.tier,
            currentScheduleId: new ObjectID(req.body.currentScheduleId)
        };
        
        return record;
    }, 
    function(req) {
        let update = {};

        for (const key in req.query) {
            if (key === "currentScheduleId") update[key] = new ObjectID(req.query[key]);
            else update[key] = req.query[key];
        }

        return update;
    }
);

module.exports = router;