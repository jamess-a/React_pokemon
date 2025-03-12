const express = require('express');
const { getUserDetails , postuseredits , getAdminDetails} = require('../controllers/userController');
const router = express.Router();

router.get('/profile', getUserDetails);
router.get('/admin_profile', getAdminDetails);
router.post('/edit/:id', postuseredits);



module.exports = router;
