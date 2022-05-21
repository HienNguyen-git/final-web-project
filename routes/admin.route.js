
var express = require('express');
const { getAdminHome, handleAdminUserAccount, handleAccountApi, handleAccountStatus,getDepositMore5m,postDepositMore5m } = require('../controllers/admin.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', getAdminHome);

router.get('/account', handleAdminUserAccount)

router.get('/account/api', handleAccountApi)

router.put('/account', handleAccountStatus)

router.get('/deposit',getDepositMore5m)
router.post('/deposit',postDepositMore5m)



module.exports = router;
