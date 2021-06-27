const express = require("express");
const { DateTime } = require("luxon");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("onlineAccounts");

const router = express.Router();

mongoRestRoutes(router, collection, 
    function(req) {
        let filter = {}; 

        return filter;
    }, 
    function(req) {
        let record = {
            accountId: new ObjectID(req.body.accountId),
            dateCreated: DateTime.fromMillis(req.body.dateCreated), 
        };
        
        return record;
    }, 
    function(req) {
        let update = {};

        for (const key in req.query) {
            switch (key) {
                case "accountId":
                    update[key] = new ObjectID(req.query[key]);
                    break;
                case "dateCreated":
                    update[key] = DateTime.fromMillis(parseInt(req.query[key]));
                    break;
                default:
                    update[key] = req.query[key];
                    break;
            }
        }

        return update;
    }
);

module.exports = router;