const Task = require('../model/task')
const Joi = require('joi');

async function getTask (req, res) {
  try{
    const getTaskSchema = Joi.object().keys({ 
      owner: Joi.number().required()
    }); 
    const result = getTaskSchema.validate(req.body);

    if(result.error!=null){
      return res.status(422).json({ 
        message: 'Invalid request', 
        data: result.error 
      }) 
    } else {
      const response = await Task.query().where({owner: req.body.owner});
      return res.send(response);
    }
  } catch (e){
    return res.status(500).send(e);
  }
}

async function putTask (req, res) {

  const putTaskSchema = Joi.object().keys({ 
    description: Joi.string().required(),
    owner: Joi.number().required(),
    completed: Joi.boolean()
  }); 
  const result = putTaskSchema.validate(req.body);

  if(result.error!=null){
    return res.status(422).json({ 
      message: 'Invalid request', 
      data: result.error 
    }) 
  } 

  const response = await Task.query().insert({
    description: req.body.description,
    completed: req.body.completed || false, 
    owner: req.body.owner
  });

  return res.send(response);
}

module.exports = {
  getTask,
  putTask
}