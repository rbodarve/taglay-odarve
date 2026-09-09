const express = require('express');
// import functions
const { getUsers, createUser, updateUser, deleteUser, loginUser, } = require('../controllers/userController');
const { protect, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Route composition
// (route name, route function[controller])

// Add login route (public)
router.post('/login', loginUser);

// User management is admin-only (protected + admin)
router.route('/').get(protect, requireAdmin, getUsers).post(protect, requireAdmin, createUser);

router.route('/:id').put(protect, requireAdmin, updateUser).delete(protect, requireAdmin, deleteUser);

module.exports = router;