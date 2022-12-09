var express = require('express');
var router = express.Router();

/**Import Controllers */
const {
  registerUser,
  getUserInfo,

} = require('../controllers/usersControllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:username', getUserInfo);

router.post('/register', registerUser);

module.exports = router;
