const express = require("express");
const {
  dashboardData,
  dashboardStats,
} = require("../controllers/adminController");
const router = express.Router();

router.route("/dashboard_data").get(dashboardData);
router.route("/dashboard_stats").get(dashboardStats);

module.exports = router;
