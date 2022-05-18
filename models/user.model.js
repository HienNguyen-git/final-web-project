const connect = require('../config/db');

const handlePostOTP = (otp,expired) => new Promise((resolve, reject) => {
    const sql = "insert into otp(otp,expired) values(?,?)"
    const value = [otp,expired];
    connect.query(sql, value, (err) => {
        if (err) reject(false)
        else{
            resolve(true);
        }
    })
})

module.exports = {
    handlePostOTP,
}