const moogonse = require('mongoose')

let UserSchema = new moogonse.Schema({
  name: String,
  password: String,
  type: String
})
module.exports = moogonse.model("User", UserSchema)