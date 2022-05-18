const statusEncode = ["Waiting for verification", "Complete", "Disable", "Pending", "Block"]


const moment = require("moment");

const formatDateTime = (dateTime)=> moment(dateTime).format("MMMM Do YYYY, h:mm:ss a")

const dataProcess = (data) => Object.values(JSON.parse(JSON.stringify(data)))

const formatDate = (dateTime)=> moment(dateTime).format("MMMM Do YYYY")

const encodeStatusCode = (status) => statusEncode[+status]

module.exports = {
    formatDateTime,
    dataProcess,
    formatDate,
    encodeStatusCode
}