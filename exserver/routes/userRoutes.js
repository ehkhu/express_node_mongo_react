const express = require('express')
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

const {getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser}  = require ('./../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;