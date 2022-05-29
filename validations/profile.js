const { check } = require('express-validator')
const connect = require('../config/db')

const profilePostCMNDValidation = [
    check('images').custom((value, { req }) => {
        if (!req.files) throw new Error("Profile Img is required");
        return true;
    }),
    
]



module.exports = {
    profilePostCMNDValidation,

}