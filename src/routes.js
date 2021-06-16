const express = require("express");

const router = express.Router();

router.use("/accounts", require("./resources/accounts"));
router.use("/pending-accounts", require("./resources/pendingAccounts"));
router.use("/online-accounts", require("./resources/onlineAccounts"));
router.use('/schedules', require('./resources/schedules'));
router.use("/stripeCustomers", require("./resources/stripeCustomers"));

router.use("/:schedule/people", require("./resources/people"));
router.use("/:schedule/events", require("./resources/events"));
router.use("/:schedule/categories", require("./resources/categories"));
router.use('/:schedule/plans', require('./resources/plans'));

module.exports = router;