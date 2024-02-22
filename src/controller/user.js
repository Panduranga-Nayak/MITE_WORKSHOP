const User = require('../model/user')
const {createUserToken} = require('../middleware/middleware')
const Joi = require('joi');
const argon2 = require('argon2');


async function createUser (req, res){
  const getTaskSchema = Joi.object().keys({ 
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }); 
  const result = getTaskSchema.validate(req.body);

  if(result.error!=null){
    return res.status(422).json({ 
      message: 'Invalid request', 
      data: result.error 
    }) 
  }

  const check = await User.query().where({
    email: req.body.email,
  });

  if(check.length){
    return res.send({
      msg: "user already exists"
    })
  }


  const hash = await argon2.hash(req.body.password);



  const response = await User.query().insert({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });
  return res.send(response);
}

async function login (req, res){
  const getTaskSchema = Joi.object().keys({ 
    email: Joi.string().required(),
    password: Joi.string().required(),
  }); 
  const result = getTaskSchema.validate(req.body);

  if(result.error!=null){
    return res.status(422).json({ 
      message: 'Invalid request', 
      data: result.error 
    }) 
  }

  const check = await User.query().where({
    email: req.body.email,
  });

  if(!check.length){
    return res.send({
      msg: "invalid user"
    })
  }
  let user = check[0];

  if (await argon2.verify(user.password, req.body.password)) {
    const userInfo = createUserToken({email: user.email, id: user.id});
    return res.send({
      success: true,
      data: {
        userInfo
      }
    });
  } else {
    return res.send("wrong password")
  }
}

module.exports = {
  createUser,
  login
};