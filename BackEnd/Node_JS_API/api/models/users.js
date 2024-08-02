const mongoose = require('mongoose');

//حتى تحط كيف شكل البروداكت تبعيى 
const validator = require('validator');

const userSchema = mongoose.Schema({
  // ...
  password:{type:String,required:true},
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Invalid email',
    },
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);