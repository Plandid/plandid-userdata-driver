const express = require("express");
const { mongoCollectionApiMethods, getdb } = require('@plandid/mongo-utils');
const { ObjectID } = require('mongodb');

const collection = getdb().collection("schedules");

const router = express.Router({ mergeParams: true });

mongoCollectionApiMethods(router, collection, 
    {
        _id: x => ObjectID(x),
        accountId: x => ObjectID(x)
    }
);

module.exports = router;