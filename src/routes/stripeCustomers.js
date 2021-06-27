const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("stripeCustomers");

const router = express.Router();

mongoRestRoutes(router, collection, function(body) {
    return {
        accountId: new ObjectID(body.accountId),
        customerId: body.customerId
    };
}, function(query) {
    if (query.hasOwnProperty("accountId")) query.accountId = new ObjectID(query.accountId);
    return query;
});

module.exports = router;