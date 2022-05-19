var express = require('express');
var router = express.Router();

const { PostDeposit,sendOtp, getDeposit, getUserInfo } = require('../controllers/deposit.controller');

<<<<<<< HEAD
router.get('/',function (req, res, next) {

  res.render('exchange/deposit',{title: 'Deposit'});
})
=======
router.get('/', getDeposit)
>>>>>>> 450678c162722b3380e76602378cc15ef188f3e8

router.post('/',PostDeposit);

router.get('/info', getUserInfo)

router.get('/sendOtp', sendOtp)

module.exports = router;
