var express = require("express");
var router = express.Router();

const {
  resetPasswordGet,
  requestOtpToMail,
  sendOtp,
  sendOtpPost,
  changePassGet,
  changePassPost,
  resendOtpPost,
  handleLogin,
  handleRegister,
  handleChangePassword,
  logoutGet,
} = require("../controllers/users.controller");
const {
  changePassValidator,
  requestOtpToMailValidator,
  loginValidator,
} = require("../validations/account");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", function (req, res, next) {
  res.render("account/login", { title: "Login" });
});

router.get("/register", function (req, res, next) {
  res.render("account/register", { title: "Register" });
});

router.get("/trans-history", function (req, res, next) {
  res.render("account/trans_history", { title: "Transaction History" });
});

router.get("/logout", logoutGet);

// * POST /login
router.post("/login", /* loginValidator, */ handleLogin);

// *POST /register
router.post("/register",  handleRegister);

// * GET /change-password
router.get("/change-password", changePassGet);

// * POST /change-password
router.post(
  "/change-password",
  /* changePassValidator, */ handleChangePassword
);

router.get("/account/resetpassword", resetPasswordGet);
router.post(
  "/account/resetpassword",
  requestOtpToMailValidator,
  requestOtpToMail
);

router.get("/account/resetpassword/sendOtp", sendOtp);
router.post("/account/resetpassword/sendOtpPost", sendOtpPost);

router.get("/account/resetpassword/changepassword", changePassGet);
router.post("/account/resetpassword/changepassword", changePassPost);

router.post("/account/resetpassword/resendOtpPost", resendOtpPost);

module.exports = router;
