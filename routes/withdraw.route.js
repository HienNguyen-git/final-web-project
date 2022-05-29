var express = require("express");
var router = express.Router();

const {
  renderWithdraw,
  handleWithdraw,
} = require("../controllers/withdraw.controller");

const { withdrawValidator } = require("../validations/account");

router.get("/", renderWithdraw);
router.post("/", withdrawValidator, handleWithdraw);

module.exports = router;
