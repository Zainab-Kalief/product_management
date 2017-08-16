var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new mongoose.Schema({
  title: {type: String},
  price: {type: String},
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

var UserSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  password: {type: String},
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
}, {timestamps: true})

mongoose.model('User', UserSchema)
mongoose.model('Product', ProductSchema)
