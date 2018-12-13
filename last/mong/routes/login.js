const Express = require('express')
const User = require('../model/user')
const {responseClient} = require('../utils')
const router = Express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', (req, res) => {
  User.findOne({name: 'hjy_1',password: '123',}).then(data => {
    if(data) {

      let d = {}
      d.name = data.name
      d.type = data.type
      d.password = data.password
      d._id = data._id
      req.session.userInfo = d
      responseClient(res, 200, 1, '已存在', d)
      return
    }
    let user = new User({
      name: 'hjy_1',
      password: '123',
      type: 'admin'
    })
    user.save().then((() => {
      User.findOne({name: 'hjy_1'}).then(data => {
        let d = {}
        d.name = data.name
        d.type = data.type
        d.password = data.password
        d._id = data._id
        req.session.userInfo = data
        responseClient(res, 200, 0, '注册成功', d)
        return
      })
    }))
  }).catch(e => {
    responseClient(res)
    return
  })
})
router.get('/userInfo', function(req, res) {
  if (req.session.userInfo) {
    responseClient(res, 200, 0, '', req.session.userInfo)
  } else {
    responseClient(res, 200, 1, '请重新登录', req.session.userInfo)
  }
})
router.get('/logout', function(req, res) {
  req.session.destroy()
  res.redirect('/')
})
module.exports = router