const express = require("express");
const jwt = require("express-jwt");
const config = require("../env");
const dataCtrl = require("../../api/controllers/DataController");

const router = express.Router();
const secret = config.jwt.jwtSecret;

router.route("/").get(jwt({ secret }), dataCtrl.list).post(dataCtrl.create);

router
  .route("/:id")
  .get(jwt({ secret }), dataCtrl.get)
  .put(jwt({ secret }), dataCtrl.update)
  .delete(jwt({ secret }), dataCtrl.remove);

/** Load user when API with id route parameter is hit */
router.param("id", dataCtrl.load);

module.exports = router;
