const { model, Schema } = require('mongoose');

const adminSchema = Schema({
  name: {
    type: String,
    required: [true, 'имя не долэно быть пустым'],
  },
  email: {
    type: String,
    required: [true, 'email не должен быть пустым'],
    unique: true,
  },
  password: {
    type: String,
    minLength: [6, 'не меньше 6 символов'],
    required: [true, 'пароль не должен пустым'],
  },
});

const Admin = model('Admin', adminSchema);

module.exports = Admin;
