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
function removeAll(){
    return messages.remove();
}

function create(message){
  if(!message.username)
    message.username = 'Anonymous';
  if(message.imageURL = '')
    message.imageURL = 'https://www.kensap.org/wp-content/uploads/empty-photo.jpg';
  const result = Joi.validate(message, schema);
  console.log(result);
  if(result.error == null){
    message.created = new Date();

    return messages.insert(message);
  }else {
    console.log('Error creating message.');
    return Promise.reject(result.error);
  }
}
module.exports = {
    getAll,
    removeAll,
    create
};