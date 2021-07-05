const express = require("express");
const { DateTime } = require("luxon");
const { mongoCollectionApiMethods, getdb } = require('@plandid/mongo-utils');
const { ObjectID } = require('mongodb');

const collection = getdb().collection("pendingAccounts");

const router = express.Router();

mongoCollectionApiMethods(router, collection, 
    { _id: x => ObjectID(x) },
    {
        _id: x => ObjectID(x),
        dateCreated: x => DateTime.fromMillis(parseInt(x))
    }
);

module.exports = router;