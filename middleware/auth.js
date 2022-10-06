const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log("Access token from auth",req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log("decodedToken : ", decodedToken);
    
    const userId = decodedToken._id;
   
    
    
    if (req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    console.log("From auth");
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};  