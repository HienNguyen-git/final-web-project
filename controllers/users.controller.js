const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailvalidator = require("email-validator");

const validatePhoneNumber = require("validate-phone-number-node-js");
const multer = require("multer");

const {
  handlePostOTP,
  handleSelectOTP,
  handleChangePass,
  getUserByUsername,
  getUserDetailByUserName,
  updatePasswordById,
  createAnAccount,
  putAccCreatedIntoUser,
  getTranSHistoryByUsername,
  increaseLoginAttemptsByUsername,
  updateStatusById,
  updateLoginDateToCurrent,
  getUserIntervalOneMinute,
  updateStatusByUsername,
  updateAbnormal,
} = require("../models/user.model");

const {
  getCardByAll,
  getCardByNumber,
  getCardByUsername,
  addCardByUsername,
  getQuantityCardByUsername,
} = require("../models/credit_card.model");

const {
  generateRandomPassword,
  generateUsername,
} = require("../config/helper");
const { validationResult } = require("express-validator");
var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
var smtpTransport = require("nodemailer-smtp-transport");
const { off } = require("../config/db");

const resetPasswordGet = (req, res) => {
  res.render("account/resetpassword", { title: "Reset Password" });
};
const requestOtpToMail = (req, res) => {
  let result = validationResult(req);
  if (result.errors.length === 0) {
    let { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    var transporter = nodemailer.createTransport({
      // config mail server
      service: "Gmail",
      auth: {
        user: "nchdang16012001@gmail.com",
        pass: "mlrafbeyqtvtqloe",
      },
    });

    // var transporter = nodemailer.createTransport(smtpTransport({ // config mail server
    //     tls: {
    //         rejectUnauthorized: false
    //     },
    //     host: 'mail.phongdaotao.com',
    //     port: 25,
    //     secureConnection: false,
    //     auth: {
    //         user: 'sinhvien@phongdaotao.com',
    //         pass: 'svtdtu'
    //     }
    // }));

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

const firstLoginGet = (req, res) => {
  let userData = req.userClaims;
  if (userData.status !== -1) {
    // Không phải login lần đầu thì không cho truy cập
    res.redirect("/");
  }
  res.render("account/user-change-pw-first-login", { title: "First Login" });
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

// todo POST /users/register
const handleRegister = async (req, res) => {
  const { phone, email, name, date_of_birth, address } = req.body;
  // console.log(phone)
  const randomUsername = generateUsername(1000000000, 9000000000);
  const randomPassword = generateRandomPassword(6);
  // console.log(randomPassword);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(randomPassword.toString(), salt);
  if (phone === undefined || phone === "") {
    return res.json({
      code: 1,
      message: "Please enter your phone",
    });
  } else if (!validatePhoneNumber.validate(phone)) {
    return res.json({
      code: 1,
      message: "Phone's form is invalid",
    });
  } else if (phone.length > 11 || phone.length < 10) {
    return res.json({
      code: 1,
      message: "Phone must have 10 or 11 number",
    });
  } else if (email === undefined || email === "") {
    return res.json({
      code: 1,
      message: "Please enter your email",
    });
  } else if (!emailvalidator.validate(email)) {
    return res.json({
      code: 1,
      message: "Email's format is invalid",
    });
  } else if (name === undefined || name === "") {
    return res.json({
      code: 1,
      message: "Please enter your name",
    });
  } else if (date_of_birth === undefined || date_of_birth === "") {
    return res.json({
      code: 1,
      message: "Please enter your date of birth",
    });
  } else if (address === undefined || address === "") {
    return res.json({
      code: 1,
      message: "Please enter your address",
    });
  } else {
    // Do mail thầy tui nghĩ đang có vấn đề nền gửi k dc, hôm kia tui có thấy mail gửi dc. Nên t để code dòng từ 287 -> 292 ở đây để tạo dc account và lưu trong db trước để thao tác mấy khác trước á
    // còn nếu muốn chạy đúng (gửi dc accoutn về mail) thì mình đóng code dòng 287 -> 292 lại rồi mở dòng 293 -> 327 để chạy. Thì này nó sẽ báo Something went wrong.
    // T có test thử bên gửi mã OTP nó cũng bị zậy nên t nghĩ là do mail thầy đang trục trặc
    await createAnAccount(
      randomUsername,
      phone,
      email,
      name,
      date_of_birth,
      address
    );
    await putAccCreatedIntoUser(randomUsername, hashPassword);
    return res.json({
      code: 0,
      message:
        "Create account successful. Please check your email to get your account!",
    });
    // var transporter = nodemailer.createTransport(smtpTransport({ // config mail server
    //   tls: {
    //       rejectUnauthorized: false
    //   },
    //   // service: 'Gmail',
    //   host: 'mail.phongdaotao.com',
    //   port: 25,
    //   secureConnection: false,
    //   auth: {
    //       user: 'sinhvien@phongdaotao.com',
    //       pass: 'svtdtu'
    //   }
    // }));

    // var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    //   from: 'sinhvien@phongdaotao.com',
    //   to: email,   //Mail của chính mình
    //   subject: 'Your account',
    //   html: '<h2>WELCOME TO OUR BANKING SYSTEM</h2><br></br><p>We send you your account. Now you can log in our system. Do not share this account for someone except you.<br></br></p>Username: '+ randomUsername +' <br></br>Password: '+ randomPassword +'<br></br>To secure you can change your password when you log in successful.</p>'
    // }
    // transporter.sendMail(mainOptions, async function  (err, info) {
    //   if (err) {
    //     return res.json({
    //       code: 1,
    //       message: "Some thing went wrong",
    //     })
    //   }else{
    //     await createAnAccount(randomUsername, phone, email, name, date_of_birth, address)
    //     await putAccCreatedIntoUser(randomUsername, hashPassword)
    //     return res.json({
    //       code: 0,
    //       message: "Create account successful. Please check your email to get your account!",
    //     })
    //   }
    // });
  }
};

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

  if (req.userClaims) {
    return res.json({
      success: false,
      message: "Already login!",
    });
  }

  let { username, password } = req.body;
  let acc = await getUserByUsername(username);

  if (!acc) {
    return res.json({ success: false, message: "Account not exist!" });
  } else {
    if (acc.status === 3 || acc.abnormal === 2) {
      // Không cho tài khoản bị block login
      return res.json({
        success: false,
        message:
          "Tài khoản đã bị khóa do nhập sai mật khẩu nhiều lần, vui lòng liên hệ quản trị viên để được hỗ trợ",
      });
    } else if (acc.status === 2) {
      // Không cho tài khoản bị vô hiệu hóa login
      return res.json({
        success: false,
        message:
          "Tài khoản này đã bị vô hiệu hóa, xin vui lòng liên hệ tổng đài 18001008",
      });
    }

    const validPassword = await bcrypt.compare(password, acc.password);

    /* 
        Cập nhật lại login_date mỗi lần user sử dụng
        chức năng login
    */
    await updateLoginDateToCurrent(username);

    if (!validPassword) {
      // ghi nhận login sai mật khẩu
      await increaseLoginAttemptsByUsername(username);

      //* Automatic lock account feature
      if (acc["login_attempts"] % 3 === 2 && username !== "admin") {
        if (acc.abnormal === 0) {
          // khóa tài khoản 1 phút
          let accIntervalOneMin = await getUserIntervalOneMinute(username);
          await updateAbnormal(username);
          await updateLoginDateToCurrent(username);

          if (accIntervalOneMin) {
            return res.json({
              success: false,
              message:
                "Tài khoản hiện đang tạm khóa, vui lòng thử lại sau 1 phút",
            });
          }
        } else if (acc.abnormal === 1) {
          // Khóa tài khoản chờ quản trị viên duyệt
          await updateAbnormal(username, 2);
          await updateStatusByUsername(username, 4);
          return res.json({
            success: false,
            message:
              "Tài khoản đã bị khóa do nhập sai mật khẩu nhiều lần, vui lòng liên hệ quản trị viên để được hỗ trợ",
          });
        }
      }
      return res.json({ success: false, message: "Incorrect password!" });
    } else {
      let assignData = {
        id: acc.id,
        username: acc.username,
        status: acc.status,
        loginAttempts: acc["login_attempts"],
      };

      let token = assignDataToCookie(res, assignData);

      const raw = await getTranSHistoryByUsername(acc.username);
      // console.log(raw.name)
      const data = raw.map((e) => ({
        id: e.id,
        phone: e.phone,
        name: e.name,
        date: e.date,
        value: e.value,
        note: e.note,
        fee: e.fee,
        total_value: e.total_value,
      }));
      // return res.redirect('/')
      // return res.render('users/trans-history', { title: "Transaction History", data,routerPath:'users/trans-history' })

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

// * POST /users/change-password
async function handleChangePassword(req, res, next) {
  let errors = validationResult(req).errors;
  let error = errors[0];

  if (error) {
    return res.json({
      success: false,
      message: error.msg,
    });
  }

  let { currentPass, newPass, renewPass } = req.body;

  if (currentPass === newPass) {
    return res.json({
      success: false,
      message: "Current password can't be the same as the new password",
    });
  }

  if (newPass !== renewPass) {
    return res.json({
      success: false,
      message: "re-new password must be the same as the new password",
    });
  }

  let userData = req.userClaims;

  if (!userData) {
    return res.json({
      success: false,
      message: "Please sign in to change your password",
    });
  }
  let acc = await getUserByUsername(userData.username);

  if (!acc) {
    return res.json({ success: false, message: "Account not exist!" });
  } else if (!bcrypt.compareSync(req.body.currentPass, acc.password)) {
    return res.json({
      success: false,
      message: "Current password is incorrect!",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPass, salt);

    await updatePasswordById(acc.id, hashPassword);

    return res.json({
      success: true,
      message: "You have changed your password successfully",
    });
  }
}

// * POST /users/first-login
async function handleFirstLogin(req, res, next) {
  let userData = req.userClaims;
  if (userData.status !== -1) {
    // Không phải login lần đầu thì không cho truy cập
    res.redirect("/");
  }
  let errors = validationResult(req).errors;
  let error = errors[0];

  if (error) {
    return res.json({
      success: false,
      message: error.msg,
    });
  }

  let { newPass, renewPass } = req.body;

  if (newPass !== renewPass) {
    return res.json({
      success: false,
      message: "re-new password must be the same as the new password",
    });
  }

  if (!userData) {
    return res.json({
      success: false,
      message: "Please sign in to change your password",
    });
  }
  let acc = await getUserByUsername(userData.username);

  if (!acc) {
    return res.json({ success: false, message: "Account not exist!" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPass, salt);

    await updatePasswordById(acc.id, hashPassword);

    // Trường hợp đăng nhập lần đầu
    updateStatusById(acc.id, 0);

    userData.status = 0;
    delete userData["iat"];
    delete userData["exp"];

    assignDataToCookie(res, userData);

    return res.json({
      success: true,
      message: "You have changed your password successfully",
    });
  }
}

// todo Get /users/profile
async function profileGet(req, res) {
  let userData = req.userClaims;

  let userDetail = await getUserDetailByUserName(userData.username);

  res.render("account/profile", {
    title: "Reset Password",
    userDetail: userDetail,
  });
}

async function profilePost(req, res, next) {
  let [font_cmnd, back_cmnd] = req.body;
  let userData = req.userClaims;
  let changeResult = updateCMND(userData.username, font_cmnd, back_cmnd);

  if (!changeResult) {
    return res.json({
      success: false,
      message: "There's error while update your cmnd",
    });
  } else {
    return res.json({
      success: true,
      message: "You have updated your cmnd successfully",
    });
  }
}

// todo Get /users/card
async function cardGet(req, res) {
  let userData = req.userClaims;
  const raw = await getCardByUsername(userData.username);
  return res.json({
    title: "card",
    isUser: true,
    routerPath: "account/card",
    data: raw,
  });
}

// todo Post /users/card
async function cardPost(req, res, next) {
  var d = new Date();
  var charge_date = d.getFullYear + "-" + d.getMonth + "-" + d.getDate;

  let userData = req.userClaims;
  let { card_number, expire_date, cvv } = req.body;

  const quantity = getQuantityCardByUsername(userData.username);
  const raw = await getCardByNumber(card_number);

  if (!raw) {
    return res.json({
      success: false,
      message: "Credit card is not supported.",
    });
  }
  if (expire_date > raw.expire_date) {
    return res.json({
      success: false,
      message: "Expire date is not correct.",
    });
  }
  if (cvv !== raw.cvv) {
    return res.json({
      success: false,
      message: "Cvv is not correct.",
    });
  }
  if (card_number == "222222" && quantity > 1000000) {
    return res.json({
      success: false,
      message: "The number of recharge cards has run out.",
    });
  }

  if (card_number == "333333") {
    return res.json({
      success: false,
      message: "Card is out of money.",
    });
  }

  let changeResult = addCardByUsername(
    userData.username,
    card_number,
    expire_date,
    cvv,
    charge_date
  );
  // console.log(data);
  if (!changeResult) {
    return res.json({
      success: false,
      message: "There's error while recharge your card",
    });
  } else {
    return res.json({
      success: true,
      message: "You have recharged your card successfully",
    });
  }
}

function assignDataToCookie(res, data) {
  /**
   * Tạo token từ data rồi thêm vào cookie
   * Input: res - Request, data - Object
   * Output: Assign token được tạo ra vào cookie và trả về token
   */
  console.log(data);
  try {
    var token = jwt.sign(data, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    // ? Sử dụng cookie hay refreshToken
    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 60 * 1000 * 60),
    });

    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function apiGetTransHistory(req, res) {
  let userData = req.userClaims;

  let data = getTranSHistoryByUsername(userData.username);

  return res.json({
    data: data,
  });
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
  firstLoginGet,
  handleRegister,
  handleLogin,
  handleChangePassword,
  handleFirstLogin,
  profileGet,
  profilePost,
  cardGet,
  cardPost,
  apiGetTransHistory,
};
