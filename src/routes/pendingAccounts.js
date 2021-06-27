const express = require("express");
const { DateTime } = require("luxon");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("pendingAccounts");

const router = express.Router();

mongoRestRoutes(router, collection, 
    function(req) {
        let filter = {}; 

        return filter;
    }, 
    function(req) {
        let record = {
            dateCreated: DateTime.fromMillis(req.body.dateCreated),
            email: req.body.email, 
            passwordHash: req.body.passwordHash
        };
        
        return record;
    }, 
    function(req) {
        let update = {};

        for (const key in req.query) {
            if (key === "dateCreated") update[key] = DateTime.fromMillis(parseInt(req.query[key]));
            else update[key] = req.query[key];
        }

        return update;
    }
);

module.exports = router;