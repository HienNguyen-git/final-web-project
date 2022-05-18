var express = require('express');
var router = express.Router();

const { resetPasswordGet,requestOtpToMail,sendOtp } = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/account/resetpassword',resetPasswordGet)
router.post('/account/resetpassword',requestOtpToMail)
router.get('/account/resetpassword/sendOtp',sendOtp)
module.exports = router;
