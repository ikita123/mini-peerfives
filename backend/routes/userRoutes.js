const express = require('express');
const { createUser, getUser, updateUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.get('/', getAllUsers);

module.exports = router;
