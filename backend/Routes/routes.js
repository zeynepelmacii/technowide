const express = require('express')
const router = express.Router()


const {getAllUsers,getUserById,register,login,updateUser,deleteUser} = require('../Controller/userController')


router.get('/usr/getAllUsers', getAllUsers);
router.get('/usr/getUserById/:id', getUserById);
router.post('/usr/register', register);
router.post('/usr/login', login);
router.patch('/usr/updateUser/:id', updateUser);
router.delete('/usr/deleteUser/:id', deleteUser);





module.exports=router