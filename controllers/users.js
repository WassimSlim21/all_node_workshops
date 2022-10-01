var User = require('../models/users');
const jwt = require('jsonwebtoken');



//Get User by Id
exports.getUser = (req, res, next) => {
    User.findById(req.params.id).then(user => {
        res.status(200).json({ user: user });
    }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
            error: err
        });
    });
}


//login function

exports.login = (req, res,next) => {
    User.findOne({
      userName: req.body.userName
      }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(),'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h'
          });
            // return the information including token as JSON
          var   responseUser = {
              email: user.email,
              role: user.role,
              userName: user.userName,
              _id : user._id
            } 
            res.json({success: true, token: 'JWT ' + token ,user: responseUser});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  }

/*
//Update User Role
*/

exports.updateUserRole = (req, res, next) => {
    user = new Object();
    console.log(req.body);

    if (req.body.role) { user.role = req.body.role; }
    console.log("new user is :", user);
    User.updateOne({ _id: req.params.id }, user).then(
        () => {
            res.status(201).json({
                message: 'user role updated !'
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
        return res.status(201).json({ success: true, msg: 'Successful created new User', data: data });  //creation successfull
    }).catch(err => {
        return res.status(403).json({ success: false, err: err });
    });
}



exports.addMultipleUser = (req, res, next) => {
    // meth 1
    //  var i =0;
    //   req.body.forEach(u => {
    //       var user = new User(u);
    //       console.log("adding ", i);
    //       user.save().then(data => {
    //        i++;
    //         console.log('****** Successful created new User ******', data); //creation successfull
    //       }).catch(err => {
    //           console.log('****** ERROR ******'); //creation successfull
    //         });
    //   });
    //   return res.status(201).json({ success: true, msg: 'Successful created multiple User'}); 
    User.insertMany(req.body.users).then(function () {
        return res.status(201).json({ success: true, msg: 'Successful created multiple User' });  //creation successfull
    }).catch(function (error) {
        return res.status(401).json({ success: true, msg: 'User existt', error: error });  //creation successfull
    });
}

exports.getAllUsers = (req, res, next) => {
    +-
    User.find().populate('pack').then(users => {
        res.send(users);
    }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
            error: err
        });
    })
};



exports.updateUserPack = (req, res, next) => {
    user = new Object();
    if (req.body.pack) {
        user.pack = req.body.pack;
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

//Update user function
exports.updateUser = (req, res, next) => {
    console.log("i'm updating the user now");
    console.log(req.body);

    let user = new User({
        userName: req.body.userName,
        email: req.body.email,
    });
    console.log('hani badaltou' + user);
    User.updateOne({ _id: req.params.id }, req.body).then(
        (newUser) => {
            res.status(201).json({
                message: 'User updated successfully!',
                user: newUser
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};



//   exports.updateUser= (req, res, next) => {
//     var user = new User();
//     User.findById({_id : req.params.id}).then((userUpdate)=>{
//         user=userUpdate;
//     })
//     if(req.body.userName) {
//         user.userName = req.body.userName;
//     }
//     console.log("new user is :", user);
//     // user.updated_at = Date.now();
//     User.findByIdAndUpdate({ _id: req.params.id }, user).then(
//         () => {
//             res.status(201).json({
//                 message: 'User Updated !'
//             });
//         }
//     ).catch(
//         (error) => {
//             console.log(error);
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// }


exports.deleteManyUsers = (req, res, next) => {
    User.deleteMany({ userName: new RegExp('^' + req.params.userName, "i") }).then(data => {
        return res.status(200).json({ success: true, msg: 'Successful deleted User', data: data });  //creation successfull
    }).catch(err => {
        return res.status(403).json({ success: false, err: err });
    });
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).then(data => {
        return res.status(200).json({ success: true, msg: 'Successful deleted User', data: data });  //creation successfull
    }).catch(err => {
        return res.status(403).json({ success: false, err: err });
    });
}