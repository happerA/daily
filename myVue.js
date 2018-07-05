function  myVue(options) {
  this._init(options)
}
myVue.prototype._init = function (options) {
  this.$options = options
  this.$el = document.querySelector(options.el)
  this.$data = options.data
  this.$methods = options.methods

  this._binding = {}
  this._obverse(this.$data)
  this._compile(this.$el)
}

myVue.prototype._obverse = function (obj) {
  let _this = this
  Object.keys(obj).forEach(function (key) {
    if(obj.hasOwnProperty(key)) {
      _this._binding[key] = {
        _directives: [] 
      }
    }
    let value = obj[key]
    if (typeof value === 'object') {
      _this._obverse(value)
    }
    let binding = _this._binding[key]
    Object.defineProperty(_this.$data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        return value
      },
      set: function (newVal) {
        if (value !== newVal) {
          value = newVal
          binding._directives.forEach(function (item) {
            item.update()
          })
        }
      }
    })
  })
}

myVue.prototype._compile = function (root) {
  let _this = this
  let nodes = root.children
  console.log(nodes)
  for (let i=0;i<nodes.length;i++) {
    let node = nodes[i]
    if (node.children.length) {
      _this._compile(node)
    }
    if (node.hasAttribute('v-click')) {
      node.onclick = (function () {
        let attrVal = nodes[i].getAttribute('v-click')
        return _this.$methods[attrVal].bind(_this.$data)
      })()
    }

    if (node.hasAttribute('v-model') && (node.tagName.toLowerCase()==='input' || node.tagName.toLowerCase()==='textarea')) {
      node.addEventListener('input', (function (key) {
        let attrVal = node.getAttribute('v-model')
        _this._binding[attrVal]._directives.push(new Watcher(
          'input',
          node,
          _this,
          attrVal,
          'value'
        ))
        return function () {
          _this.$data[attrVal] = nodes[key].value
        }
      })(i))
    }

    if (node.hasAttribute('v-bind')) {
      let attrVal = node.getAttribute('v-bind')
      _this._binding[attrVal]._directives.push(new Watcher(
        'text',
        node,
        _this,
        attrVal,
        'innerHTML'
      ))
    }
  }
}

function Watcher (name, el, vm, exp, attr) {
  this.name = name
  this.el = el
  this.vm = vm
  this.exp = exp
  this.attr = attr

  this.update()
}

Watcher.prototype.update = function () {
  console.log(this.exp, this.vm)
  this.el[this.attr] = this.vm.$data[this.exp]
}