/* es6 decoraotor
 */
@testable
class MyTest {

}
function testable (target) {
  target.isTestAble = true
}
MyTest.isTestAble

/**
 * @decorator
 * class A {}
 * 等同于 A= decorator(A) || A
 */

// 如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。
@testable(true) // @testable(false)
class MyTest {

}
function testable (bol) {
  return function(target) {
    target.isTestAble = bol
  }

}
/* MyTest.isTestAble = true
 * 前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作。
 */
function testable (target) {
  target.prototype.isTestAble = true
}
//let obj = new MyTest() obj.isTestAble = true


/*
 * 通过修饰器mixins，把Foo对象的方法添加到了MyClass的实例上面。可以用Object.assign()模拟这个功能。。
 */
function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}

const Fn = {
  fn() {
    console.log('fn')
  }
}
@mixins(Fn)
class MyTest{}
// let obj = new MyTest() obj.fn() 'fn'

/*
 * react react-redux使用
 */
class A extends Components{}
export default connect(mapStateToProps, mapDispatchToProps)(A)
// 等同
@connect(mapStateToProps, mapDispatchToProps)(A)
export default class A extends Components{}

/*
 * 修饰类的属性。
 */
class P {
  @readonly
  name() { return `${this.first}` }
}
function readonly (target, name, descriptor) {
  // descriptor 默认
  // {
  //   value: speicfiedFunction,
  //   enumerator: false,
  //   configurable: true,
  //   writable: true,
  // }
  descriptor.writable = false
  reurn descriptor;
}
readonly(P.prototype, 'name', descriptor)
// 类似 Object.defineProperty(P.prototype, 'name', descriptor)


/*
 * 输出日志的作用。
 */
class Math {
  @log
  add(a, b) {return a+b}
}
function log(target, name, descriptor) {
  var val = descriptor.value
  descriptor.value = function() {
    console.log(`calling ${name} with`, arguments)
    return val.call(this, arguments)
  }
  return descriptor
}