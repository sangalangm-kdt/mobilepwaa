// src/routes/index.js
const express = require("express");
const loginRoute = require("./loginRoute");
const protectedRoutes = require("./protectedRoutes");
const cylinderStatusRoute = require("./statusRoute");
const statusRoute = require("./statusRoute");
const existingDataRoute = require("./existingDataRoute");
const router = express.Router();

router.use(loginRoute);
router.use(protectedRoutes);
router.use(cylinderStatusRoute);
router.use(statusRoute);
router.use(existingDataRoute);

module.exports = router;
