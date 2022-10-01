var express = require('express');
var router = express.Router();
var productCtl = require('../controllers/products');
var passport = require('passport');
require('../config/passport')(passport);

const auth = require('../middleware/auth');

/* GET products listing. */
router.get('/',auth,productCtl.getAllProducts);
router.get('/paginate',productCtl.getAllProductsPagination);
/* GET products listing. */
router.post('/add',productCtl.addMultipleProduct);
/* GET products listing. */
router.put('/update/:userId',productCtl.updateProduct);
/* GET products listing. */
router.delete('/remove/:userId',productCtl.deleteProduct);

module.exports = router;
