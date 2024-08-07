const express = require('express');
const {getUserDetailsadmin , deleteUser , addUser} = require('../controllers/adminController');
const router = express.Router();


router.get('/admin',getUserDetailsadmin)
router.delete('/admin/:ids',deleteUser)
router.post('/adduser',addUser)

module.exports = router;
