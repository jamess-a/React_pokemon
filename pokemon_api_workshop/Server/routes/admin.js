const express = require('express');
const {getUserDetailsadmin , deleteUser} = require('../controllers/adminController');
const router = express.Router();


router.get('/admin',getUserDetailsadmin)
router.delete('/admin/:ids',deleteUser)

module.exports = router;
