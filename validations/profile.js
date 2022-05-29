const { check } = require('express-validator')
const connect = require('../config/db')

const profilePostCMNDFrontValidation = [
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
    
]
const profilePostCMNDBackValidation = [
    check('image2').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
    
]


module.exports = {
    profilePostCMNDFrontValidation,
    profilePostCMNDBackValidation

}