const express = require('express');
const { getUserDetails , postuseredits} = require('../controllers/userController');
const router = express.Router();

router.get('/profile', getUserDetails);
router.post('/edit/:id', postuseredits);


module.exports = router;
