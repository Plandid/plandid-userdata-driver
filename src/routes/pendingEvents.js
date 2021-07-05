const express = require("express");
const { DateTime } = require("luxon");
const { mongoCollectionApiMethods, getdb } = require('@plandid/mongo-utils');
const { ObjectID } = require('mongodb');

const collection = getdb().collection("pendingEvents");

const router = express.Router({ mergeParams: true });

mongoCollectionApiMethods(router, collection, 
    {
        _id: x => ObjectID(x),
        scheduleId: x => ObjectID(x)
    },
    {
        startDate: x => DateTime.fromMillis(parseInt(x)),
        milliseconds: x => parseInt(x)
    }
);

module.exports = router;