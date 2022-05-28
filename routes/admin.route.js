var express = require("express");
const {
  getAdminHome,
  handleAdminUserAccount,
  handleAccountApi,
  handleAccountStatus,
  getDepositMore5m,
  postDepositMore5m,
  getWithdrawMore5m,
  postWithdrawMore5m,
  apiGetWithdrawMore5m,
  getTransHistory,
} = require("../controllers/admin.controller");
const { adminWithdrawValidator } = require("../validations/account");
var router = express.Router();

/* GET users listing. */
router.get("/", getAdminHome);

router.get("/account", handleAdminUserAccount);

router.get("/account/api", handleAccountApi);

router.put("/account", handleAccountStatus);

router.get("/deposit", getDepositMore5m);
router.post("/deposit", postDepositMore5m);

router.get("/trans-history", getTransHistory);

router.get("/withdraw/api", apiGetWithdrawMore5m);
router.get("/withdraw", getWithdrawMore5m);
router.post("/withdraw", adminWithdrawValidator, postWithdrawMore5m);

module.exports = router;
