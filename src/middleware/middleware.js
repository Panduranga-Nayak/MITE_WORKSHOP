var jwt = require('jsonwebtoken');

function createUserToken(user){
  const jwtGen= jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60*60),
    data: {
      email: user.email,
      id: user.id
    }
  }, 'secret');
  return jwtGen;
}

function validateUserToken(req, res, next){
  jwt.verify(req.headers.authorization, 'secret', function(err, decoded) {
    if(!decoded || err){
      return res.send({
        success: false,
        msg: "Login expired"
      });
    }
    if(decoded.data.id == req.body.owner){
      next();
    } else {
      return res.send({
        success: false,
        msg: "Invalid User"
      });
    }
  });
}

module.exports = {
  createUserToken,
  validateUserToken
}