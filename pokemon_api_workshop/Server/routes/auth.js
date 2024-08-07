const express = require('express');
const { register, login , Admin_login} = require('../controllers/authController');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin_login', Admin_login);


module.exports = router;
