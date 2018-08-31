const inFunction = fn => typeof fn === 'function'
const PEND = 'pending'
const FULFUILLED = 'fulfilled'
const REJECTED = 'rejected'

class Mypromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('should be a function')
    }

    this._state = PEND
    this._value = undefined
    this._fulfilledQueues = []
    this._rejectedQueues = []
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch(err) {
      this._reject(err)
    }
  }

  _resolve(val) {
    if (this._state!==PEND) return
    this._state = FULFILLED
    this._value = val

    const callback = () => {
      const runFulfilled = (value) => {
        let cb
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      const runRejected = (value) => {
        let cb
        while (cb = this._rejectQueues.shift()) {
          cb(value)
        }
      }
      if (val instanceof Mypromise) {
        val.then(runFulfilled, runRejected)
      } else {
        runFulfilled(val)
      }
    }
    setTimeout(callback, 0)
  }

  _reject (err) {
    if (this._state!==PEND) return
    this._state = REJECTED
    this._value = err
    const run = () => {
      let cb 
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    setTimeout(run, 0)
  }

  then (onFulfilled, onRejected) {
    const {_value, _state} = this
    return new Mypromise((onFulfilledNext, onRejectedNext) => {
      let fulfilled = value => {
        try {
          if(!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value)
            if (res instanceof Mypromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch(e) {
          onRejectedNext(err)
        }
      }
      let rejected = value => {
        try {
          if(!isFunction(onRejected)) {
            onRejected(value)
          } else {
            let res = onRejected(value)
            if (res instanceof Mypromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch(e) {
          onRejectedNext(err)
        }
      }
      switch (_state) {
        case PEND:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        case FULFUILLED:
          fulfilled(_val)
          break
        case REJECTED:
          rejected(_val)
          break
      }
    })
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  static resolve(val) {
    if (val instanceof Mypromise) return value
    return new Mypromise(resolve => resolve(val))
  }
  // 静态reject
  static reject(val) {
    return new Mypromise((resolve,reject) => reject(val))
  }
  static all(list) {
    return new Mypromise((resolve, reject) => {
      let values = []
      let count = 0
      for (let [i,p] of list.entries()) {
        this.resolve(p).then(res => {
          values[i] = res
          counts++
          // 所有状态都变成fulfilled时 返回的mypromise状态也会改变
          if (count === list.length) {
            resolve(values)
          }
        }), err => {
          reject(err)
        }
      }
    })
  }

  static race(list) {
    return new Mypromise((resolve, reject) => {
      for (let p of list) {
        //只要有一个实例率先改变状态 新的mypromise状态也会跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }), err => {
          reject(err)
        } 
      }
    })
  }

  finally (cb) {
    return this.then(
      val => Mypromise.resolve(cb()).then(() => val),
      reason => Mypromise.resolve(cb()).then(() => {throw reason})
    )
  }
}