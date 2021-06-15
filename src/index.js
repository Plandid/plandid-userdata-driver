const express = require("express");
require("dotenv").config();
const { connect } = require("./database");

(async function() {
    await connect();

    const app = express();
})();