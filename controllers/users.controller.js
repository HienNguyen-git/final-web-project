const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  handlePostOTP,
  handleSelectOTP,
  handleChangePass,
  getUserByUsername,
  updatePasswordById,
} = require("../models/user.model");
const { validationResult } = require("express-validator");
var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
var smtpTransport = require("nodemailer-smtp-transport");

const resetPasswordGet = (req, res) => {
  res.render("account/resetpassword", { title: "Reset Password" });
};
const requestOtpToMail = (req, res) => {
  let result = validationResult(req);
  if (result.errors.length === 0) {
    let { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    // var transporter = nodemailer.createTransport({ // config mail server
    //     service: 'Gmail',
    //     auth: {
    //         user: 'nchdang16012001@gmail.com',
    //         pass: 'mlrafbeyqtvtqloe'
    //     }
    // });

    var transporter = nodemailer.createTransport(
      smtpTransport({
        // config mail server
        tls: {
          rejectUnauthorized: false,
        },
        // service: 'Gmail',
        host: "mail.phongdaotao.com",
        port: 25,
        secureConnection: false,
        auth: {
          user: "sinhvien@phongdaotao.com",
          pass: "svtdtu",
        },
      })
    );

    var mainOptions = {
      // thiết lập đối tượng, nội dung gửi mail
      from: "sinhvien@phongdaotao.com",
      to: email,
      subject: "OTP code",
      html:
        "<p>You have got a code: " +
        otp +
        "<br></br> Code will expired in 1 minute </p>",
    };

    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        // console.log(err);
        req.session.flash = {
          type: "danger",
          intro: "Oops!",
          message: "Some thing went wrong",
        };

        res.redirect("/users/account/resetpassword");
      } else {
        //lưu vào db
        let time = Date.now() + 60000;
        let day = new Date(time);
        req.session.email = email;
        handlePostOTP(email, otp, day);
        req.session.flash = {
          type: "success",
          intro: "Congratulation!",
          message:
            "OTP has been sent to your email. Please check your email!!!!",
        };
        res.redirect("/users/account/resetpassword/sendOtp");
      }
    });
  } else {
    const errors = result.mapped();
    let errorMessage = errors[Object.keys(errors)[0]].msg;
    req.session.flash = {
      type: "danger",
      intro: "Oops!",
      message: errorMessage,
    };
    res.redirect("/users/account/resetpassword");
  }
};

const sendOtp = (req, res) => {
  res.render("account/sendOtp", { title: "sendOtp" });
};

const sendOtpPost = async (req, res) => {
  let { otpcode } = req.body;
  let otpdatabase = await handleSelectOTP(req.session.email);
  const result = Object.values(JSON.parse(JSON.stringify(otpdatabase)));
  let rightnow = new Date(Date.now()).getTime();
  let expiredtime = new Date(result[3]).getTime();
  if (otpcode === result[2] && expiredtime > rightnow) {
    req.session.flash = {
      type: "success",
      intro: "Congratulation!",
      message: "OTP is right. Please change your password!!!!",
    };
    res.redirect("/users/account/resetpassword/changepassword");
  } else {
    req.session.flash = {
      type: "danger",
      intro: "Oops!",
      message: "Your OTP not match or OTP expired",
    };
    res.redirect("/users/account/resetpassword/sendOtp");
  }
};

const changePassGet = (req, res) => {
  res.render("account/user-change-pw", { title: "changepassword" });
};

const changePassPost = async (req, res) => {
  let result = validationResult(req);
  if (result.errors.length === 0) {
    let { newpass, renewpass } = req.body;
    // console.log(password,newpass,renewpass);
    if (newpass !== renewpass || newpass === "" || renewpass === "") {
      req.session.flash = {
        type: "danger",
        intro: "Oops!",
        message: "New password and Renew Password have problem",
      };
      return res.redirect("/users/account/resetpassword/changepassword");
    } else if (await handleChangePass(newpass, req.session.email)) {
      req.session.flash = {
        type: "success",
        intro: "Congratulation!",
        message: "Change password successful",
      };
      return res.redirect("/users/login");
    } else {
      req.session.flash = {
        type: "danger",
        intro: "Oops!",
        message: "Some thing went wrong here2",
      };
      return res.redirect("/users/account/resetpassword/changepassword");
    }
  } else {
    const errors = result.mapped();
    let errorMessage = errors[Object.keys(errors)[0]].msg;
    req.session.flash = {
      type: "danger",
      intro: "Oops!",
      message: errorMessage,
    };
    res.redirect("/users/account/resetpassword/changepassword");
  }
};

const resendOtpPost = (req, res) => {
  // let { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  // var transporter = nodemailer.createTransport({ // config mail server
  //     service: 'Gmail',
  //     auth: {
  //         user: 'nchdang16012001@gmail.com',
  //         pass: 'mlrafbeyqtvtqloe'
  //     }
  // });
  var transporter = nodemailer.createTransport(
    smtpTransport({
      // config mail server
      tls: {
        rejectUnauthorized: false,
      },
      // service: 'Gmail',
      host: "mail.phongdaotao.com",
      port: 25,
      secureConnection: false,
      auth: {
        user: "sinhvien@phongdaotao.com",
        pass: "svtdtu",
      },
    })
  );

  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "sinhvien@phongdaotao.com",
    to: req.session.email,
    subject: "OTP code",
    html:
      "<p>You have got a code: " +
      otp +
      "<br></br> Code will expired in 1 minute </p>",
  };

  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      // console.log(err);
      req.session.flash = {
        type: "danger",
        intro: "Oops!",
        message: "Some thing went wrong",
      };

      res.redirect("/users/account/resetpassword/sendOtp");
    } else {
      //lưu vào db
      let time = Date.now() + 60000;
      let day = new Date(time);
      handlePostOTP(req.session.email, otp, day);
      req.session.flash = {
        type: "success",
        intro: "Congratulation!",
        message:
          "OTP has been resent to your email. Please check your email!!!!",
      };
      res.redirect("/users/account/resetpassword/sendOtp");
    }
  });
};

// GET '/logout'
function logoutGet(req, res) {
  res.clearCookie("accessToken");
  res.redirect("/users/login");
}

// todo POST /users/login
async function handleLogin(req, res, next) {
  // Validation from loginValidator
  let errors = validationResult(req).errors;
  let error = errors[0];

  if (error) {
    return res.json({
      success: false,
      message: error.msg,
    });
  }

  let accessToken = req.cookies.accessToken;

  if (accessToken) {
    return res.json({
      success: false,
      message: "Already login!",
    });
  }

  let acc = await getUserByUsername(req.body.username);

  if (!acc) {
    return res.json({ success: false, message: "Account not exist!" });
  } else {
    const validPassword = await bcrypt.compare(req.body.password, acc.password);
    if (!validPassword) {
      return res.json({ success: false, message: "Incorrect password!" });
    } else {
      var token = jwt.sign(
        {
          id: acc.id,
          username: acc.username,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // ? Sử dụng cookie hay refreshToken
      res.cookie("accessToken", token, {
        expires: new Date(Date.now() + 60 * 1000 * 60),
      });

      return res.json({
        success: true,
        message: "Login successful",
        token: token,
        name: acc.username,
        id: acc.id,
      });
    }
  }
}

// todo POST /users/change-password
async function handleChangePassword(req, res, next) {
  let errors = validationResult(req).errors;
  let error = errors[0];

  if (error) {
    return res.json({
      success: false,
      message: error.msg,
    });
  }
  let userData = await getDataFromToken(req);

  if (!userData) {
    return res.json({
      success: false,
      message: "Please sign in to change your password",
    });
  }
  let acc = await getUserByUsername(userData.username);

  if (!acc) {
    return res.json({ success: false, message: "Account not exist!" });
  } else if (bcrypt.compareSync(req.body.currentPass, acc.password)) {
    return res.json({
      success: false,
      message: "Current password is incorrect!",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPass, salt);

    let changeResult = updatePasswordById(acc.id, hashPassword);

    if (!changeResult) {
      return res.json({
        success: false,
        message: "There's error while changing your password",
      });
    } else {
      return res.json({
        success: true,
        message: "You have changed your password successfully",
      });
    }
  }
}

function getDataFromToken(req) {
  /**
   * Function này sẽ giải mã token và trả về data lấy được từ token
   * Input: Request request
   * Output: data lấy được từ token, null nếu không lấy được
   */
  try {
    let token = req.cookies.accessToken;
    let data = jwt.verify(token, process.env.TOKEN_KEY);

    return data;
  } catch {
    return null;
  }
}

module.exports = {
  resetPasswordGet,
  requestOtpToMail,
  sendOtp,
  sendOtpPost,
  changePassGet,
  changePassPost,
  resendOtpPost,
  logoutGet,
  handleLogin,
  handleChangePassword,
};
