var express = require('express');
const passport = require('passport');
var router = express.Router();

/**Import Controllers */
const {
  getUserProfile,
  getAllUsers,

} = require('../controllers/userControllers');
const { validateUser } = require('../controllers/auth');

router.use(validateUser);

/* GET users listing. */
router.get('/:id', getUserProfile);
router.get('/all', getAllUsers);

module.exports = router;
