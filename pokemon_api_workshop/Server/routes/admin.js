const express = require('express');
const {getUserDetailsadmin} = require('../controllers/adminController');
const router = express.Router();


router.get('/admin',getUserDetailsadmin)

module.exports = router;
