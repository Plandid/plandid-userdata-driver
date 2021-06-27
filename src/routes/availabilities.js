const express = require("express");
const { DateTime } = require("luxon");
const { fetchdb, ObjectID } = require("../database");
const { mongoRestRoutes } = require("../utils");

const collection = fetchdb().collection("availabilities");

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
            personId: new ObjectID(req.body.personId),
            availabilities: Array.isArray(req.body.availabilities) ? req.body.availabilities.map(function(obj) {
                return {
                    start: DateTime.fromMillis(obj.start),
                    end: DateTime.fromMillis(obj.end),
                    rrule: obj.rrule
                };
            }) : []
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
                case "scheduleId":
                    update[key] = new ObjectID(req.query[key]);
                    break;
                case "personId":
                    update[key] = new ObjectID(req.query[key]);
                    break;
                case "availabilities":
                    if (!Array.isArray(req.query[key])) throw "availabilites query string must be a valid array";
                    else update[key] = req.query[key];
                default:
                    update[key] = req.query[key];
                    break;
            }
        }
        
        return update;
    }
);

router.put("/:availabilityIndex", async function(req, res, next) {
    try {
        // await collection.replaceOne()
    } catch (error) {
        next(error);
    }
});

module.exports = router;