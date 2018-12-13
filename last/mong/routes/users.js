var express = require('express');
var router = express.Router();
var User = require("../user.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  function insert() {

    var user = new User({
        username : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 37,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save(function (err, response) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + JSON.stringify(response));
            res.send(JSON.stringify(response));
        }

    });
  }

  // insert()
  // res.send('respond with a resource');
  function del() {
    var whereStr = {username : 'Tracy McGrady'}
    User.remove(whereStr, function (err, response) {

      if (err) {
          console.log("Error:" + err);
      }
      else {
          console.log("Res:" + JSON.stringify(response));
          res.send(JSON.stringify(response));
      }

    })
  }
  // del()
  function update() {
    var whereStr = {username : 'Tracy McGrady'}
    var updatestr = {'userpwd': 'zzzz'};
    User.update(whereStr, updatestr,  function (err, response) {

      if (err) {
          console.log("Error:" + err);
      }
      else {
          console.log("Res:update" + JSON.stringify(response));
          res.send(JSON.stringify(response));
      }

    })
  }
  update()
});

module.exports = router;
