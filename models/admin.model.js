const connect = require('../config/db')

const getUserAccountByStatus = (status) => new Promise((resolve, reject) => {
    connect.query('select * from user where status=? and username!="admin" ORDER BY last_modified desc', [status], (err, result) => {
        if (err) reject(false)
        else {
            resolve(result)
        }
    })
})

const getUserDetailByUsername = (username) => new Promise((resolve, reject) => {
    connect.query('SELECT * FROM user a, user_detail b where a.username=b.username and a.username=?', [username], (err, result) => {
        if (err) reject(false)
        else {
            resolve(result)
        }
    })
})

const updateUserStatus = (username, status, currentDateTime) => new Promise((resolve, reject) => {
    console.log(currentDateTime)
    connect.query('update user set status=?, last_modified=? where username=?', [status, currentDateTime, username], (err, result) => {
        if (err) reject(false)
        else {
            if(result.changedRows!=0){
                console.log(result)
                resolve(true)
            }else{
                reject(false)
            }
        }
    })
})


module.exports = {
    getUserAccountByStatus,
    getUserDetailByUsername,
    updateUserStatus
}