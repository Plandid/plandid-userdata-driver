const express = require("express");

const router = express.Router();

router.use("/accounts", require("./routes/accounts"));
router.use("/pendingAccounts", require("./routes/pendingAccounts"));
router.use("/onlineAccounts", require("./routes/onlineAccounts"));
router.use('/schedules', require('./routes/schedules'));

router.use("/:scheduleId/availabilities", require("./routes/availabilities"));
router.use("/:scheduleId/events", require("./routes/events"));

module.exports = router;