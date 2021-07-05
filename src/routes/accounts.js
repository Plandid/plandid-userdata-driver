const express = require("express");
const { mongoCollectionApiMethods, getdb } = require('@plandid/mongo-utils');
const { ObjectID } = require('mongodb');

const collection = getdb().collection("accounts");

const router = express.Router();

mongoCollectionApiMethods(router, collection, 
    { _id: x => ObjectID(x) },
    {
        _id: x => ObjectID(x),
        currentScheduleId: x => ObjectID(x)
    }    
);

module.exports = router;