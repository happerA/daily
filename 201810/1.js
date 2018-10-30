// 观察 模式

function Subject() {
  this.observers = []
}

Subject.prototype = {
  add: function(observer) {
    this.observers.push(observer)
  },
  del: function(observer) {
    this.observers = this.observers.filter(item => item!=observer)
  },
  notice: function() {
    this.observers.forEach(item => {
      item.update()
    });
  }
}

function Observer(name) {
  this.name = name
}
Observer.prototype = {
  update : function () {
    console.log(this.name)
  }
}

let sub = new Subject()
let ob1 = new Observer('ob1')
let ob2 = new Observer('ob2')
sub.add(ob1)
sub.add(ob2)
sub.notice()

// 发布

let pubSub = {
  list: {},
  subscribe: function(key, fn) {// dingyue
    if (!this.list[key]) {
      this.list[key] = []
    }
    this.list[key].push(fn)
  },
  publish: function () {// fabu
    let arg = arguments
    let key = [].shift.call(arg)
    let fns = this.list[key]

    if (!fns||fns.length<=0) return false
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, arg)
    }
  },
  unSubscribe: function(key) {
    delete this.list[key]
  }
}

pubSub.subscribe('name', name => {
  console.log('name: ' + name)
})

pubSub.subscribe('sex', sex => {
  console.log('sex: ' + sex)
})
pubSub.publish('sex', 'male')
pubSub.publish('name', 'tt')