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

// todo POST /login
router.post("/login", /* loginValidator ,*/ handleLogin);

router.get("/logout", logoutGet);
// todo GET /change-password
router.get("/change-password", changePassGet);

// todo POST /change-password
router.post("/change-password", handleChangePassword);

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
