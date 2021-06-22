const { model, Schema } = require('mongoose');

const requestSchema = Schema({
  name: { type: String, required: true },
  companyName: String,
  phone: { type: String, required: true },
  email: { type: String, required: true },
  description: String,
  img: String,
  link: String,
  status: { type: String, default: 'В обработке' },
},
{
  timestamps: true,
});

const Request = model('Request', requestSchema);

module.exports = Request;
