var express = require("express");
var router = express.Router();

const {
  renderWithdraw,
  handleWithdraw,
} = require("../controllers/withdraw.controller");

router.get("/", renderWithdraw);
router.post("/", handleWithdraw);

module.exports = router;
