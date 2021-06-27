const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("people");

const router = express.Router();

mongoRestRoutes(router, collection, function(body) {
    return {
        accountId: new ObjectID(body.accountId),
        scheduleId: new ObjectID(body.scheduleId),
        name: body.name,
        categories: Array.isArray(body.categories) ? body.categories : []
    };
}, function(query) {
    if (query.hasOwnProperty("accountId")) query.accountId = new ObjectID(query.accountId);
    if (query.hasOwnProperty("scheduleId")) query.scheduleId = new ObjectID(query.scheduleId);
    if (query.hasOwnProperty("categories") && !Array.isArray(query.categories)) throw "categories query string must be a valid array";
    return query;
});

module.exports = router;