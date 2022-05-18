const { handlePostOTP } = require('../models/user.model');
const { formatDateTime } = require('../config/helper');

const resetPasswordGet = (req, res) => {
    res.render('account/resetpassword', { title: 'Reset Password' });
}

var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer
const requestOtpToMail = (req, res) => {
    let { email } = req.body;
    // console.log(email)
    const otp = Math.floor(100000 + Math.random() * 900000);
    var transporter = nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'nchdang16012001@gmail.com',
            pass: 'mlrafbeyqtvtqloe'
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'nchdang16012001@gmail.com',
        to: email,
        subject: 'OTP code',
        html: '<p>You have got a code: ' + otp + '<br></br> Code will expired in 1 minute </p>'
    }

    //lưu vào db
    console.log(formatDateTime(Date.now()));
    let expiredDay = Date.now() + 60000;
    handlePostOTP(otp, expiredDay);

    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
            // res.redirect('/users/account/resetpassword/sendOtp');
        } else {
            // console.log('Message sent: ' +  info.response);
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "OTP has been sent to your email. Please check your email!!!!"
            }
            res.redirect('/users/account/resetpassword/sendOtp');
        }
    });
};

const sendOtp = (req, res) => {
    res.render('account/sendOtp', { title: 'sendOtp' });
}


module.exports = {
    resetPasswordGet,
    requestOtpToMail,
    sendOtp
};