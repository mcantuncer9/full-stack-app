const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(5).max(20).required(),
  subject: Joi.string().required(),
  message: Joi.string().max(255).required(),
  imageURL: Joi.string().uri({
      scheme: [
          /https?/
      ]
  })
});

const messages = db.get('messages');

function getAll() {
  return messages.find();
}

function create(message){
  const result = Joi.validate(message, schema);
  if(result.err == null){
    message.created = new Date();
    return messages.insert(message);
  }else {
    return Promise.reject(result.error());
  }
}
module.exports = {
    getAll,
    create
};