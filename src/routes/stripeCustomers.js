const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("stripeCustomers");

const router = express.Router();

mongoRestRoutes(router, collection, function(req) {
    return { _id: new ObjectID(req.params.id) };
}, function(req) {
    return {
        accountId: new ObjectID(req.body.accountId),
        customerId: req.body.customerId
    };
}, function(req) {
    if (req.query.hasOwnProperty("accountId")) req.query.accountId = new ObjectID(req.query.accountId);
    return req.query;
});

mongoRestRoutes(router, collection, 
    function(req) {
        let filter = {}; 

        return filter;
    }, 
    function(req) {
        let record = {
            accountId: new ObjectID(req.body.accountId),
            customerId: req.body.customerId
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
                default:
                    update[key] = req.query[key];
                    break;
            }
        }

        return update;
    }
);

module.exports = router;