var User = require('../models/users');
//Get User by Id
exports.getUser = (req, res, next) => {
    User.findById(req.params.id).then(user => {
      res.status(200).json({user:user});
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }
  
  /*
  //Update User Role
  */
  
  exports.updateUserRole = (req, res, next) => {
      user = new Object();
      console.log(req.body);
  
      if (req.body.role)
          {user.role = req.body.role;}
      console.log("new Account is :", user);
      User.updateOne({ _id: req.params.id }, user).then(
          () => {
              res.status(201).json({
                  message: 'Account role updated !'
              });
          }
      ).catch(
          (error) => {
              res.status(400).json({
                  error: error
              });
          }
      );
  }
  
  exports.addUser = (req, res, next) => {
      var user = new User(req.body);
      user.save().then(data => {
          return res.status(201).json({ success: true, msg: 'Successful created new User', data:data });  //creation successfull
        }).catch(err => {
          return res.status(403).json({ err: err });
        });
    }
    
  
    
  exports.addMultipleUser = (req, res, next) => {
     // meth 1
     var i =0;
      req.body.forEach(u => {
          var user = new User(u);
          console.log("adding ", i);
          user.save().then(data => {
           i++;
            console.log('****** Successful created new User ******', data); //creation successfull
          }).catch(err => {
              console.log('****** ERROR ******'); //creation successfull
            });
      });
      return res.status(201).json({ success: true, msg: 'Successful created multiple User'}); 
    //   User.insertMany(req.body.users).then(function(){
    //       return res.status(201).json({ success: true, msg: 'Successful created multiple User'});  //creation successfull
    //   }).catch(function(error){
    //       console.log(error)      // Failure
    //   });
    }
  
    exports.getAllUsers = (req, res, next) => {+-
      User.find().populate('pack').then(users => {
          res.send(users);
      }).catch(err => {
          console.log('ERROR', err)
          res.status(401).json({
              error: err
          });
      })
    };
  
  
  
    exports.updateUserPack= (req, res, next) => {
      user = new Object();
      if (req.body.pack)
      {
          user.pack = req.body.pack ;
      }  
      console.log("new user is :", user);
      user.updated_at = Date.now();
      User.updateOne({ _id: req.params.id }, user).then(
          () => {
              res.status(201).json({
                  message: 'User Updated !'
              });
          }
      ).catch(
          (error) => {
              res.status(400).json({
                  error: error
              });
          }
      );
  }
  