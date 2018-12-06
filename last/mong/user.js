var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/runoob')

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + 'mongodb://localhost:27017/runoob');
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

var userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  avatar: {type: String},
  age: {type: Number, default: 0},
  email: {type: String},
  time: {type: Date, default: Date.now},
})
//创建model
var UserModel = mongoose.model('user', userSchema)

module.exports = UserModel