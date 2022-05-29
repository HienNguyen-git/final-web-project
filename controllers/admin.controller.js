const { formatDateTime, dataProcess, formatDate, encodeStatusCode, formatDateTime2 } = require("../config/helper");
const { getUserAccountByStatus, getUserDetailByUsername, updateUserStatus,handleSelectDepositMore5m,updateStatusToCheck,handleSelectEmailDepositMore5m } = require("../models/admin.model");
const {handleUpdateTotalValueOfSender,handleUpdateTotalValueOfReceiver} = require('../models/deposit.model');
var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer

const getAdminHome = (req, res) => {
    res.render('admin/home', { title: "Admin", isAdmin: true, routerPath:'' });
}

const handleAdminUserAccount = async (req, res) => {
    const username = req.query['username']
    if (username === undefined) {
        const raw = await getUserAccountByStatus(0)
        const data = raw.map(e => ({
            id: e.id,
            username: e.username,
            status: e.status,
            last_modified: formatDateTime(e.last_modified)
        }))

        return res.render('admin/account', { title: "Account", isAdmin: true, data,routerPath:'admin/account' })
    } else {
        const raw = await getUserDetailByUsername(username)
        const data = raw.map(e => ({
            id: e.id,
            username: e.username,
            status: encodeStatusCode(e.status),
            statusCode: e.status,
            phone: e.phone,
            email: e.email,
            name: e.name,
            date_of_birth: formatDate(e.date_of_birth),
            address: e.address,
            front_cmnd: e.front_cmnd,
            back_cmnd: e.back_cmnd,
            total_value: e.total_value
        }))
        console.log(data)
        return res.render('admin/account-info', { title: "Account", isAdmin: true, data })
    }
}

const handleAccountApi = async (req, res) => {
    const statusArr = [0, 1, 2, 3, 4]
    let status = req.query["status"]
    if (status === undefined) {
        status = 0
    }
    if (!statusArr.includes(+status)) {
        return res.json({
            code: 1,
            message: "Status not valid!",
        })
    } else {
        const raw = await getUserAccountByStatus(status)
        const data = raw.map(e => ({
            id: e.id,
            username: e.username,
            status: e.status,
            last_modified: formatDateTime(e.last_modified)
        }))
        res.json({
            code: 0,
            message: "Get data successful!",
            data
        })
    }
}

const handleAccountStatus = async (req,res)=>{
    const {username, action} = req.body
    
    if(username===undefined||action===undefined){
        return res.json({
            code:1,
            message:"Missing input value!"
        })
    }else{
        try {
            const actions = ['verify','cancel','request']
            const actionIndex = actions.indexOf(action)+1
            const currentDateTime = formatDateTime2();
            if(await updateUserStatus(username,actionIndex,currentDateTime)){
                return res.json({
                    code: 0,
                    message: `Update username=${username} successful!`,
                })
            }else{
                res.json({
                    code:1,
                    message:"Something went wrong!"
                })
            }
        } catch (error) {
            console.log(error.message)
            
        }
    }


}


const getDepositMore5m = async (req,res) =>{
    const raw = await handleSelectDepositMore5m(0);
    const data = raw.map(e => ({
        id: e.id,
        phone_sender: e.phone_sender,
        phone_receiver: e.phone_receiver,
        value: e.value,
        fee: e.fee,
        feeperson: e.feeperson,
        note: e.note,
        status: e.status === 0 ? false : true,
        date: formatDateTime(e.date),
        
    }))
    // console.log(data);
    res.render('admin/deposit',{title: 'Deposit',isAdmin: true, routerPath: 'admin/deposit',data})
}

const postDepositMore5m = async(req,res) =>{
    let {id,phone_sender,phone_receiver,value,fee,feeperson} = req.body;
    //console.log(id,phone_sender,phone_receiver,value,fee,feeperson)
    try {
        let moneyDepositFeeReceiver = value;
        if(feeperson == 'receiver'){
            moneyDepositFeeReceiver = value - fee;
            // console.log(moneyDepositFeeReceiver)
        }
        else{
            value = +value + +fee;
        }
        await handleUpdateTotalValueOfSender(value,phone_sender);
        await handleUpdateTotalValueOfReceiver(moneyDepositFeeReceiver,phone_receiver);
        await updateStatusToCheck(1,+id)
        let email = await handleSelectEmailDepositMore5m(phone_receiver);
        console.log(email);



        //email to receiver
        var transporter = nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'nchdang16012001@gmail.com',
                pass: 'mlrafbeyqtvtqloe'
            }
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
        
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'sinhvien@phongdaotao.com',
            to: email,
            subject: 'Confirm Deposit',
            html: '<p>Sender: ' + phone_sender +
            '<br></br> Receiver: ' + phone_receiver + 
            '<br></br> Money:' + moneyDepositFeeReceiver + '</p>'
        }
    
        transporter.sendMail(mainOptions, async function  (err, info) {
            if (err) {
                // console.log(err);
                // req.session.flash = {
                //     type: "danger",
                //     intro: "Oops!",
                //     message: "Some thing went wrong"
                // }
                return res.json({
                    code: 1,
                    message: `Some thing wrong`,
                })
                // return res.redirect('/deposit')
            } else {
                // req.session.flash = {
                //     type: "success",
                //     intro: "Congratulation!",
                //     message: "OTP is right. And money is deposit to receiver. Receiver please check mail!"
                // }
                return res.json({
                    code: 0,
                    message: `Update status successful!`,
                })
                // return res.redirect('/deposit/successDeposit')

            }
        });
        // return res.json({
        //                 code: 0,
        //                 message: `Update status successful!`,
        //             })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAdminHome,
    handleAdminUserAccount,
    handleAccountApi,
    handleAccountStatus,
    getDepositMore5m,
    postDepositMore5m,
}