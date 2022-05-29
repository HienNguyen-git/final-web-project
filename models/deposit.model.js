const connect = require('../config/db');

const handlePostDeposit = (phone_sender,phone_receiver,value,fee,feeperson,note,status,date) => new Promise((resolve, reject) => {
    const sql = "insert into deposit(phone_sender,phone_receiver,value,fee,feeperson,note,status,date) values(?,?,?,?,?,?,?,?)"
    const values = [phone_sender,phone_receiver,value,fee,feeperson,note,status,date];
    connect.query(sql, values, (err) => {
        if (err) reject(false)
        else{
            resolve(true);
        }
    })
})

const selectReceiverValue = (phone_receiver) => new Promise((resolve,reject) =>{
    const sql = "select * from user_detail where phone = ?"
    const values = [phone_receiver];
    connect.query(sql, values, (err,result) => {
        if (err) reject(err)
        else{
            resolve(result[0]);
        }
    })
})

const selectReceiverName = (phone_receiver) => new Promise((resolve,reject) =>{
    const sql = "select * from user_detail where phone = ?"
    const values = [phone_receiver];
    connect.query(sql, values, (err,result) => {
        if (err) reject(false)
        else{
            resolve(true);
        }
    })
})

const handleSelectDepositByPhone = (phone) => new Promise((resolve,reject) => {
    connect.query("select * from deposit where phone_sender=? order by date desc limit 1",[phone],(err,result)=>{
        if(err) reject(err)
        resolve(result[0])
    })
})

const handleUpdateStatusDeposit5m = (phone) => new Promise((resolve,reject) => {
    connect.query("update deposit set status = 0 where phone_sender=? order by date desc limit 1",[phone],(err,result)=>{
        if(err) reject(err)
        resolve(true)
    })
})

const handleUpdateTotalValueOfSender = (moneyDepositFeeSender,phone) => new Promise((resolve,reject) =>{
    // console.log(moneyDepositFeeSender);
    const sql = "update user_detail set total_value = total_value - ? where phone = ?"
    const values = [moneyDepositFeeSender,phone];
    connect.query(sql, values, (err) => {
        if (err) reject(false)
        else{
            resolve(true);
        }
    })
})
const handleUpdateTotalValueOfReceiver = (moneyDepositFeeReceiveer,phone) => new Promise((resolve,reject) =>{
    const sql = "update user_detail set total_value = total_value + ? where phone = ?"
    const values = [moneyDepositFeeReceiveer,phone];
    connect.query(sql, values, (err) => {
        if (err) reject(false)
        else{
            resolve(true);
        }
    })
})


const getUserDepositInfo = (username)=> new Promise((resolve,reject)=>{
    connect.query("select * from user_detail where username=?",[username],(err,result)=>{
        if(err) reject(err)
        resolve(result[0])
    })
})


module.exports ={
    handlePostDeposit,
    selectReceiverValue,
    getUserDepositInfo,
    handleSelectDepositByPhone,
    handleUpdateTotalValueOfSender,
    handleUpdateTotalValueOfReceiver,
    selectReceiverName,
    handleUpdateStatusDeposit5m,
}