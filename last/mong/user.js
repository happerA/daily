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
  username : { type: String },                    //用户账号
  userpwd: {type: String},                        //密码
  userage: {type: Number},                        //年龄
  logindate : { type: Date}
})
//创建model
var User = mongoose.model('user', userSchema)

module.exports = User