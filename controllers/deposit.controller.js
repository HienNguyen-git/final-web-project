const { handlePostDeposit, getUserDepositInfo,handleSelectDepositByPhone,handleUpdateTotalValueOfSender,handleUpdateTotalValueOfReceiver } = require('../models/deposit.model');
const { handlePostOTP,handleSelectOTP } = require('../models/user.model');
const { validationResult } = require('express-validator');
var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer
const { dataProcess } = require('../config/helper');

const PostDeposit = async (req,res) =>{
    let {phone_receiver,money,feeperson,note} = req.body;
    // const phone = req.session.phone;
    const phone = '0908123456';
    let status = 1;
    let fee = money * 0.05;
    if(money > 5000000){
        status = 0;
    }
    let date = new Date();
    const email = 'tdtnguyendang@gmail.com';
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

    transporter.sendMail(mainOptions, async function  (err, info) {
        if (err) {
            // console.log(err);
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            
            return res.redirect('/deposit')
        } else {
            //lưu vào db
            let time = Date.now() + 60000;
            let day = new Date(time);
            // let email = req.session.email;
            await handlePostOTP(email,otp, day);
            await handlePostDeposit(phone,phone_receiver,money,fee,feeperson,note,status,date)
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Please check OTP in your email"
            }
            return res.redirect('/deposit/sendOtp')
        }
    });
    
}

const getDeposit = async (req,res)=>{
    // const username = req.session.username
    const username = 'haidang'
    const data = await getUserDepositInfo(username)
    //console.log(data)
    res.render('exchange/deposit',{title: 'Deposit', data});
}


const sendOtp = (req, res) => {
    res.render('exchange/sendOtp', { title: 'sendOtp' });
}

const sendOtpPost = async (req, res) => {
    // let email = req.session.email;
    const email = 'tdtnguyendang@gmail.com';
    let { otpcode } = req.body;
    let otpdatabase = await handleSelectOTP(email);
    const result = Object.values(JSON.parse(JSON.stringify(otpdatabase)));
    let rightnow = new Date(Date.now()).getTime();
    let expiredtime = new Date(result[3]).getTime();

    // const phone = req.session.phone;
    const phone = '0908123456';
        let depositByPhone = await handleSelectDepositByPhone(phone)
        // console.log(depositByPhone.value);
        if(otpcode === result[2] && expiredtime > rightnow){
        
            if(depositByPhone.value < 5000000){
                let moneyDepositFeeReceiver = depositByPhone.value;
                if(depositByPhone.feeperson == 'receiver'){
                    moneyDepositFeeReceiver = depositByPhone.value - depositByPhone.fee;
                    // console.log(moneyDepositFeeReceiver)
                }
                await handleUpdateTotalValueOfSender(depositByPhone.value,depositByPhone.phone_sender);
                await handleUpdateTotalValueOfReceiver(moneyDepositFeeReceiver,depositByPhone.phone_receiver);
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "OTP is right. And money is deposit to receiver"
                }
                res.redirect('/deposit/successDeposit')
            }else{
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "OTP is right. And money is pending by admin because value is bigger than 5m"
                }
                res.redirect('/deposit/pendingDeposit')
            }
        }else{
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Your OTP not match or OTP expired"
            }
            res.redirect('/deposit/sendotp');
        }

    
}

const getSuccessDeposit = (req,res) =>{
    res.render('exchange/successDeposit',{title:'Deposit successfully'});
}

const getPendingDeposit = (req,res) =>{
    res.render('exchange/pendingDeposit',{title:'Deposit successfully'});
}



const getUserInfo = async(req,res)=>{
    // const username = req.session.username
    const username = 'haidang'
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
    getUserInfo,
    sendOtpPost,
    getSuccessDeposit,
    getPendingDeposit,

}