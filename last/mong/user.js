var mongoose = require('mongoose')
var db = require('./db')

var userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  avatar: {type: String},
  age: {type: Number, default: 0},
  email: {type: String},
  time: {type: Date, default: Date.now},
})
//创建model
var UserModel = db.model('user', userSchema)

module.exports = UserModel