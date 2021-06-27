const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("accounts");

const router = express.Router();

mongoRestRoutes(router, collection, function(body) {
    return {
        email: body.email,
        passwordHash: body.passwordHash,
        tier: body.tier,
        currentSchedule: body.currentSchedule
    };
}, function(query) {
    return query
});

module.exports = router;