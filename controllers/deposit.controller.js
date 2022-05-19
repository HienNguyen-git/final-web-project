const { handlePostDeposit, getUserDepositInfo } = require('../models/deposit.model');
const { validationResult } = require('express-validator');
var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer
const { dataProcess } = require('../config/helper');

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

const getDeposit = async (req,res)=>{
    // const username = req.session.username
    const username = 'user1'
    const data = await getUserDepositInfo(username)
    console.log(data)
    res.render('exchange/deposit',{title: 'Deposit', data});
}


const sendOtp = (req, res) => {
    res.render('exchange/sendOtp', { title: 'sendOtp' });
}

const getUserInfo = async(req,res)=>{
    // const username = req.session.username
    const username = 'user1'
    let data = await getUserDepositInfo(username)
    data = ({
        username: data.username,
        phone: data.phone,
        email: data.email,
        name: data.name,
        date_of_birth: data.date_of_birth,
        address: data.address,
        total_value: data.total_value,
    })
    res.json({
        code: 0,
        message: "Get data successful!",
        data
    })
}

module.exports = {
    PostDeposit,
    sendOtp,
    getDeposit,
    getUserInfo
}