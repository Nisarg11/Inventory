const express = require('express');

const {check} = require('express-validator');

const usersControllers = require('../controllers/users-controllers');
const router = express.Router();

router.get('/:uid', usersControllers.getUserById);

router.get('/all/all', usersControllers.getAllUsers);

router.post('/add',
[check('name')
.not()
.isEmpty(),
check('email')
.normalizeEmail()
.isEmail(),
check('password').isLength({ min: 6 })],  usersControllers.createUser);

router.patch('/:uid',
[check('name')
.not()
.isEmpty(),
check('email')
.normalizeEmail()
.isEmail(),
check('password').isLength({ min: 6 })], usersControllers.updateUser);

router.delete('/:uid',  usersControllers.deleteUser);

module.exports = router ;