const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("onlineAccounts");

const router = express.Router();

mongoRestRoutes(router, collection, function(body) {
    return {
        accountId: new ObjectID(body.accountId),
        dateCreated: new Date(body.dateCreated), 
    };
}, function(query) {
    if (query.hasOwnProperty("accountId")) query.accountId = new ObjectID(query.accountId);
    if (query.hasOwnProperty("dateCreated")) query.dateCreated = new Date(query.dateCreated);
    return query;
});

module.exports = router;