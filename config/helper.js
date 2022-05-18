const statusEncode = ["Waiting for verification", "Complete", "Disable", "Pending", "Block"]


const moment = require("moment");

const formatDateTime = (dateTime) => moment(dateTime).format("MMMM Do YYYY, h:mm:ss a")

const formatDateTime2 = (dateTime) => moment(dateTime).format("YYYY-MM-DD hh:mm:ss")

const dataProcess = (data) => Object.values(JSON.parse(JSON.stringify(data)))

const formatDate = (dateTime) => moment(dateTime).format("MMMM Do YYYY")

const encodeStatusCode = (status) => {
    switch (status) {
        case 0:
            return `<i class="fa fa-exclamation text-warning"> ${statusEncode[status]}</i>`
            break
        case 1:
            break
        case 2:
            break
        case 3:
            break
        case 4:
            break
    }
}

module.exports = {
    formatDateTime,
    formatDateTime2,
    dataProcess,
    formatDate,
    encodeStatusCode
}