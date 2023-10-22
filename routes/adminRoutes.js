const express = require("express");
const { dashboardData } = require("../controllers/adminController");
const router = express.Router();

router.route("/dashboard_data").get(dashboardData);

module.exports = router;
