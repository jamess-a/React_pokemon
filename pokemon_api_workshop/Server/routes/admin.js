const express = require('express');
const {getUserDetails , deleteUser , addUser , get_admin_user , addAdmin , deleteAdminUser} = require('../controllers/adminController');
const router = express.Router();


router.get('/get_user',getUserDetails)
router.get('/get_admin_user',get_admin_user)


router.delete('/delete_admin/:ids',deleteAdminUser)
router.delete('/delete_user/:ids',deleteUser)

router.post('/add_user',addUser)
router.post('/add_admin',addAdmin)

module.exports = router;
