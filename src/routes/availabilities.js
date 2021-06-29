const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { simpleDatabaseMethods } = require("../utils");

const collection = fetchdb().collection("availabilities");

const router = express.Router();



module.exports = router;