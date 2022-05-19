var express = require('express');
var router = express.Router();

const { PostDeposit,sendOtp, getDeposit, getUserInfo,sendOtpPost,getSuccessDeposit,getPendingDeposit } = require('../controllers/deposit.controller');

router.get('/', getDeposit)

router.post('/',PostDeposit);

router.get('/info', getUserInfo)

router.get('/sendOtp', sendOtp)

router.post('/sendOtp',sendOtpPost)

router.get('/successDeposit',getSuccessDeposit)

router.get('/pendingDeposit',getPendingDeposit)

module.exports = router;
