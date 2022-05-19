const connect = require("../config/db");

const getNetworkProvider = () => new Promise((resolve, reject) => {
    connect.query('select * from network_provider', (err, result) => {
        if (err) reject(err.message)
        else {
            resolve(result)
        }
    })
})

const createBill = (username, provider_number,code, price, quantity)=> new Promise((resolve, reject)=>{
    connect.query('insert into bill(username, provider_number,code, price, quantity) values(?,?,?,?,?)',[username, provider_number,code, price, quantity],(err,result)=>{
        if(err) reject(err.message)
        resolve(result)
    })
})


module.exports = {
    getNetworkProvider,
    createBill
}