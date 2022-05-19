var express = require('express');
var router = express.Router();

const { PostDeposit,sendOtp, getDeposit, getUserInfo } = require('../controllers/deposit.controller');

router.get('/', getDeposit)

router.post('/',PostDeposit);

router.get('/info', getUserInfo)

router.get('/sendOtp', sendOtp)

module.exports = router;
