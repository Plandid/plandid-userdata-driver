const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("pendingAccounts");

const router = express.Router();

mongoRestRoutes(router, collection, function(body) {
    return {
        dateCreated: new Date(body.dateCreated), 
        email: body.email, 
        passwordHash: body.passwordHash
    };
}, function(query) {
    if (query.hasOwnProperty("dateCreated")) query.dateCreated = new Date(query.dateCreated);
    return query;
});

module.exports = router;