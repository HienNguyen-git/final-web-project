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
        if (err) reject(false)
        else{
            resolve(result[0]);
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
    getUserDepositInfo
}