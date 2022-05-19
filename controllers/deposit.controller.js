const { handlePostDeposit } = require('../models/deposit.model');
const { validationResult } = require('express-validator');
var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer

const PostDeposit = async (req,res) =>{
    let {phone_receiver,money,feeperson,note} = req.body;
    req.session.phone = '0908577254';
    let status = 1;
    let fee = money * 0.05;
    if(money > 5000000){
        status = 0;
    }
    let date = new Date();
    console.log(req.session.phone,phone_receiver,money,fee,feeperson,note,status,date);

    if(await handlePostDeposit(req.session.phone,phone_receiver,money,fee,feeperson,note,status,date)){
        req.session.flash = {
            type: "success",
            intro: "Congratulation!",
            message: "Please check OTP in your email"
        }
        return res.redirect('/deposit/sendotp')
    } else {
        req.session.flash = {
            type: "danger",
            intro: "Oops!",
            message: "Some thing went wrong here2"
        }
        return res.redirect('/deposit')
    }
    
}


const sendOtp = (req, res) => {
    res.render('exchange/sendOtp', { title: 'sendOtp' });
}

module.exports = {
    PostDeposit,
    sendOtp,


}