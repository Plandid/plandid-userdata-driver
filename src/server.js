const express = require("express");
const { connect } = require("./database");
require("dotenv").config();

(async function() {
    await connect();

    const app = express();
})();