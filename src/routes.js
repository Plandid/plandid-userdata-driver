const express = require("express");

const router = express.Router();

router.use("/accounts", require("./routes/accounts"));
router.use("/pendingAccounts", require("./routes/pendingAccounts"));
router.use("/onlineAccounts", require("./routes/onlineAccounts"));
router.use('/schedules', require('./routes/schedules'));
router.use("/stripeCustomers", require("./routes/stripeCustomers"));

router.use("/:schedule/people", require("./routes/people"));
router.use("/:schedule/events", require("./routes/events"));
router.use("/:schedule/categories", require("./routes/categories"));
router.use('/:schedule/plans', require('./routes/plans'));

module.exports = router;