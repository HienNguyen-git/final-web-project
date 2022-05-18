const { dataProcess } = require("../config/helper")
const { getNetworkProvider } = require("../models/phone_card.model")

const handlePhoneCard = async (req, res) => {
    const networkProvider = dataProcess(await getNetworkProvider())
    console.log(networkProvider)
    res.render('exchange/phone_card', { title: "Phone Card", networkProvider })
}

module.exports = {
    handlePhoneCard
}