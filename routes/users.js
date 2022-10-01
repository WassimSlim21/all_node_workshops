var express = require('express');
var router = express.Router();
var userCtl = require('../controllers/users');
/* GET users listing. */
router.get('/',userCtl.getAllUsers);
/* GET users listing. */
router.get('/:id',userCtl.getUser);
/* GET user listing. 
:3000/users/add
*/
router.post('/add',userCtl.addUser);
/* GET multiple users listing. 
:3000/users/addMany
*/
router.post('/addMany',userCtl.addMultipleUser);

/* GET users listing. */
router.put('/update/:id',userCtl.updateUser);
// /* GET users listing. */
router.delete('/removeMany/:userName',userCtl.deleteManyUsers);
router.delete('/remove/:id',userCtl.deleteUser);

// router.delete('/remove',userCtl.deleteUserByReqQueryParams);
router.post('/login', userCtl.login );

module.exports = router;
