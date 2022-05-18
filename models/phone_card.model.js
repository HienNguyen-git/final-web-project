const connect = require("../config/db");

const getNetworkProvider = () => new Promise((resolve, reject) => {
    connect.query('select * from network_provider', (err, result) => {
        if (err) reject(err.message)
        else {
            resolve(result)
        }
    })
})

module.exports = {
    getNetworkProvider
}