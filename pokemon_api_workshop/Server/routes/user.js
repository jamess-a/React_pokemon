const express = require('express');
const { getUserDetails , getUserDetailsadmin} = require('../controllers/userController');
const router = express.Router();

router.get('/profile', getUserDetails);
router.get('/users', getUserDetailsadmin);

module.exports = router;
