var mongoose = require('mongoose')

var db = mongoose.connect('mongoose://localhost:27017/myblog')

module.exports = db