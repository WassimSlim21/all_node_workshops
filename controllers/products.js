
const Product = require('../models/product');
exports.getAllProducts = (req,res,next) =>{
    Product.find().then(products => {
        res.status(200)
        .json({products : products});
    }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
            error: err
        });
    })

}



//http://localhost:3000/api/products?pageNo=3&size=2

// get products with pagination
exports.getAllProductsPagination = async (req, res) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
      response = { "error": true, "message": "invalid page number, should start with 1" };
      return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    Product.count({}, function (err, totalCount) {
      if (err) {
        response = { "error": true, "message": "Error fetching data" }
      }
      Product.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = { "error": true, "message": "Error fetching data" };
        } else {
          var totalPages = Math.ceil(totalCount / size)
          response = { "error": false, "message": data, "pages": totalPages, "total": totalCount, "pageIndex": pageNo };
        }
        res.json(response);
      })
    })
  }
  





exports.addProduct = (req,res,next) =>{
    console.log("add Product");
    res.status(200).json({"Product" : {Product : "wassim"}});
    next();
}

exports.addMultipleProduct = (req, res, next) => {
  
     Product.insertMany(req.body.products).then(function(){
         return res.status(201).json({ success: true, msg: 'Successful created multiple Products'});  //creation successfull
     }).catch(function(error){
       return res.status(400).json({ success: true, msg: 'Product exist', error:error});  //creation successfull
   });
   }




exports.updateProduct = (req,res,next) =>{
    console.log("update Product");
    res.status(200).json({"Product" : {Product : "wassim"}});
    next();

}

exports.deleteProduct = (req,res,next) =>{
    console.log("delete User");
    console.log("userId :", req.params.userId);
   return res.status(200).json({msg: 'delete user successfully', data: users.filter(user => user.id != req.params.userId)});

}


