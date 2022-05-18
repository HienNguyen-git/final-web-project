
var express = require('express');
const { getAdminHome, handleAdminUserAccount, handleAccountApi, handleAccountStatus } = require('../controllers/admin.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', getAdminHome);

router.get('/account', handleAdminUserAccount)

router.get('/account/api', handleAccountApi)

router.put('/account', handleAccountStatus)



module.exports = router;
