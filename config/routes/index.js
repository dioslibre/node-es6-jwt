const express = require("express");
const userRoutes = require("./user");
const authRoutes = require("./auth");
const dataRoutes = require("./data");

const router = express.Router();

router.get("/api-status", (req, res) => res.json({ status: "ok" }));

router.use("/users", userRoutes);
router.use("/data", dataRoutes);
router.use("/auth", authRoutes);

module.exports = router;
