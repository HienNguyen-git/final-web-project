const connect = require('../config/db');
const bcrypt = require('bcrypt')
const saltRounds = 10;

const handlePostOTP = (email,otpcode,expired) => new Promise((resolve, reject) => {
    const sql = "insert into otp(email,otpcode,expired) values(?,?,?)"
    const value = [email,otpcode,expired];
    connect.query(sql, value, (err) => {
        if (err) reject(false)
        else{
            resolve(true);
        }
    })
})

const handleSelectOTP = (email) => new Promise((resolve,reject) =>{
    const sql = "select * from otp where email = ? order by expired desc limit 1";
    const value = email;
    connect.query(sql,value,(err,result) =>{
        if (err) reject(false)
        else{
            resolve(result[0]);
        }
    })
})

const handleChangePass = (newpass,email) => new Promise((resolve, reject) => {
    const sql = "UPDATE user SET password = ? where username = ?"
    bcrypt.hash(newpass, saltRounds, (err, hash) => {
        const value = [hash,email]
        connect.query(sql, value, (err) => {
            if (err) reject(false)
        })
    })
    resolve(true)
})

module.exports = {
    handlePostOTP,
    handleSelectOTP,
    handleChangePass
}