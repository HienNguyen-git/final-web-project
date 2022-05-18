
var express = require('express');
const { getAdminHome, handleAdminUserAccount, handleAccountApi } = require('../controllers/admin.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', getAdminHome);

router.get('/account', handleAdminUserAccount)

router.get('/account/api', handleAccountApi)



module.exports = router;
