const connect = require('../config/db')

const getUserAccountByStatus = (status) => new Promise((resolve, reject) => {
    connect.query('select * from user where status=? and username!="admin" ORDER BY last_modified desc',[status], (err, result) => {
        if (err) reject(false)
        else {
            resolve(result)
        }
    })
})

const getUserDetailByUsername = (username) => new Promise((resolve,reject)=>{
    connect.query('SELECT * FROM user a, user_detail b where a.username=b.username and a.username=?',[username], (err, result) => {
        if (err) reject(false)
        else {
            resolve(result)
        }
    })
})

const updateUserStatus = (username,status) => new Promise((resolve,reject)=>{
    connect.query('update user set status=? where username=?',[status,username], (err) => {
        if (err) reject(false)
        else {
            resolve(true)
        }
    })
})


module.exports = {
    getUserAccountByStatus,
    getUserDetailByUsername,
    updateUserStatus
}