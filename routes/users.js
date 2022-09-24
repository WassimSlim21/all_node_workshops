var express = require('express');
var router = express.Router();
var userCtl = require('../controllers/users');
/* GET users listing. */
router.get('/',userCtl.getAllUsers);
/* GET users listing. */
router.get('/:id',userCtl.getUser);
/* GET user listing. */
router.post('/add',userCtl.addUser);
/* GET multiple users listing. */
router.post('/addMany',userCtl.addMultipleUser);

/* GET users listing. */
router.put('/update/:id',userCtl.updateUserRole);
// /* GET users listing. */
// router.delete('/remove/:userId/:name',userCtl.deleteUser);
// router.delete('/remove',userCtl.deleteUserByReqQueryParams);

module.exports = router;
