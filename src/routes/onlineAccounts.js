const express = require("express");
const { mongoCollectionApiMethods, getdb } = require('@plandid/mongo-utils');
const { ObjectID } = require('mongodb');

const collection = getdb().collection("onlineAccounts");

const router = express.Router();

mongoCollectionApiMethods(router, collection, 
    { _id: x => ObjectID(x) },
    {
        accountId: x => ObjectID(x),
        dateCreated: x => DateTime.fromMillis(parseInt(x))
    }
);

module.exports = router;