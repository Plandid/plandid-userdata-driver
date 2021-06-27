const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("events");

const router = express.Router({ mergeParams: true });

mongoRestRoutes(router, collection, 
    function(req) {
        let filter = {
            scheduleId: new ObjectID(req.params.scheduleId)
        };

        return filter;
    }, 
    function(req) {
        let record = {
            accountId: new ObjectID(req.body.accountId),
            scheduleId: new ObjectID(req.params.scheduleId),
            categories: Array.isArray(req.body.categories) ? req.body.categories : []
        };
        
        return record;
    }, 
    function(req) {
        let update = {};

        for (const key in req.query) {
            if (key === "scheduleId") update.scheduleId = new ObjectID(req.query.scheduleId);
            else if (key === "accountId") update.accountId = new ObjectID(req.query.accountId);
            else if (key === "categories" && !Array.isArray(req.query.categories)) throw "categories query string must be a valid array";
            else update[key] = req.query[key];
        }
        
        return update;
    }
);

module.exports = router;