var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

var UserSchema = new Schema({


  userName: {
        type: String,
        required: false,
        unique: true,    },
  email: {
        type: String,
        unique: true,
        required: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          }
    },
  password: {
        type: String,
        required: true
    },
    pack: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pack",
           },
    role: {
        type: String,
        enum: ['admin', 'super-admin'],
        default: 'admin'
    }

});

UserSchema.pre('save', function (next) {
    var User = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(User.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                User.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};




module.exports = mongoose.model('User', UserSchema);