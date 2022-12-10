var express = require('express');
const { registerUser, loginUser } = require('../controllers/auth');
var router = express.Router();

// ROUTES 
router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;