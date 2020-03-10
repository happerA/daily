function Element (tagName, attrs, childs) {
  
  this.tagName = tagName
  this.attrs = attrs
  this.childs = childs

  this.render = function () {
    let element =  document.createElement(this.tagName)
    let attrs = this.attrs
    let childs = this.childs

    for (let attr in attrs) {
      setAttr(element, attr, attrs[attr])
    }

    for (let i=0;i<childs.length;i++) {
      let child = childs[i]
      let childElement = child instanceof Element ? child.render() : document.createTextNode(child)
      element.appendChild(childElement)
    }

    return element
  }
}

function setAttr (ele, attr, value) {
  switch (attr) {
    case 'style': ele.style.cssText = value
      break
    case 'value': 
      let tagName = ele.tagName.toLowerCase()
      if (tagName === 'input' || tagName === 'textarea') {
        ele.value = value
      } else {
        ele.setAttribute(attr, value)
      }
      break
    default: ele.setAttribute(attr, value)
      break
  }
}

function createElement (tagName, props, child) {
  return new Element (tagName, props, child)
}

let keyIndex = 0;

function diff (oldEle, newEle) {
  let patches = {}
  keyIndex = 0
  walk(patches, 0, oldEle, newEle)
  return patches
}

//分析变化
function walk (patches, index, oldEle, newEle) {
  let currentPatches = []
  if (!newEle) {
    currentPatches.push({type: 'remove'})
  } else if (oldEle.tagName === newEle.tagName) {
    walkChild(patches, currentPatches, oldEle.childs, newEle.childs)
  }

  if (currentPatches.length) {
    patches[index] = currentPatches
  }
  console.log(patches)
}

function walkChild (patches, currentPatches, oldChilds, newChilds) {
  if (oldChilds) {
    for (let i=0;i<oldChilds.length;i++) {
      let oldChild = oldChilds[i]
      let newChild = newChilds[i]
      walk(patches, ++keyIndex, oldChild, newChild)
    }
  }
}

let index = 0;
let allPatches;
function patch (root, patches) {
  allPatches = patches
  walkNode(root)
}
function walkNode (root) {
  let currentPatches = allPatches[index]
  index++
  (root.childNodes || [])&& root.childNodes.forEach(child => {
    walkNode(child)
  });
  if (currentPatches) {
    doPatch (root, currentPatches)
  }
}

function doPatch (ele, currentPatches) {
  currentPatches.forEach(currentPatch => {
    if(currentPatch.type === 'remove') {
      ele.parentNode.removeChild(ele)
    }
  })
}

//test
import { throws } from "assert";
import { stat } from "fs";

Function.prototype.mybind = function(thisArg) {
  if (typeof this !== "function") {
    throw TypeError("error");
  }

  const args = Array.prototype.slice.call(arguments, 1);
  const self = this;
  const nop = function() {};
  const bound = function() {
    return self.apply(
      this instanceof nop ? this : thisArg,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  if (this.prototype) {
    nop.prototype = this.prototype;
  }
  bound.prototype = new nop();
  return bound;
};

Function.prototype.mycall = function(thisArg) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  const fn = Symbol("fn");
  const args = [...arguments].slice(1);
  thisArg = thisArg || window;
  thisArg[fn] = this;
  const result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
};

Function.prototype.myapply = function(thisArg) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }

  const args = arguments[1];
  const fn = Symbol("fn");
  thisArg[fn] = this;
  const result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
};

Array.prototype.myreduce = function reduce(callbackfn) {
  const o = this;
  let len = o.length;
  let k = 0;
  let accumlator = undefined;
  let kPresent = false;
  let initialValue = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof callbackfn !== "function") {
    throw new TypeError("error");
  }
  if (len === 0 && arguments.length < 2) {
    throw new TypeError("no initial");
  }
  if (arguments.length > 1) {
    accumlator = initialValue;
  } else {
    accumlator = o[k];
    k++;
  }

  while (k < len) {
    if (kPresent) {
      const kValue = o[k];
      accumlator = callbackfn.apply(undefined, [accumlator, kValue, k, o]);
    }
    ++k;
  }
  return accumlator;
};

function myNew() {
  let obj = new Object();
  let Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" && ret !== null ? ret : obj;
}

function _extends(child, parent) {
  Object.setPrototypeOf(child, parent);

  function _() {
    this.constructor = child;
  }
  child.prototype =
    parent === null
      ? Object.create(parent)
      : ((_.prototype = parent.prototype), new _());
}

function _asyncToGenerator(fn) {
  return function() {
    let self = this;
    let args = arguments;
    return new Promise(function(resolve, reject) {
      let gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(
          gen,
          resolve,
          rejectm,
          _next,
          _throw,
          "_next",
          value
        );
      }
      function _throw(err) {
        asyncGeneratorStep(
          gen,
          resolve,
          rejectm,
          _next,
          _throw,
          "_throw",
          value
        );
      }

      _next(undefined);
    });
  };
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    let info = gen[key](arg);
    let value = info.value;
  } catch (err) {
    reject(err);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

const data = { text: "default" };

const input = document.getElementById("input");
const span = document.getElementById("span");

const handler = {
  set(target, key, value) {
    target[key] = value;
    input.value = value;
    span.innerHTML = value;
    return value;
  }
};
const proxy = new Proxy(data, handler);
input.addEventListener("keyup", function(e) {
  proxy.text = e.target.value;
});

const d = { text: "default" };

const inp = document.getElementById("input");
const sp = document.getElementById("span");

Object.defineProperty(d, "text", {
  set(value) {
    target[key] = value;
    input.value = value;
    span.innerHTML = value;
  }
});
input.addEventListener("keyup", function(e) {
  data.text = e.target.value;
});

if (typeof Object.create !== "function") {
  Object.create = function(prototype, properties) {
    if (typeof prototype !== "object") {
      throw TypeError();
    }
    function Ctor() {}
    Ctor.prototype = prototype;
    var o = new Ctor();
    if (prototype) {
      o.constructor = Ctor;
    }
    if (properties !== undefined) {
      if (properties !== Object(properties)) {
        throw TypeError();
      }
      Object.defineProperties(o, properties);
    }
    return o;
  };
}

function instance_of(l, r) {
  var o = r.prototype;
  l = l.__proto__;
  while (true) {
    if (l === null) {
      return false;
    }
    if (o === l) {
      return true;
    }
    l = l.__proto__;
  }
}

Array.myIsArr = function(o) {
  return Object.prototype.toString.call(Object(o)) === "[Object Array]";
};

if (typeof Object.getOwnPropertyNames !== "function") {
  Object.getOwnPropertyNames = function(o) {
    if (o !== Object(o)) {
      throw TypeError("no-object");
    }
    let props = [];
    let p;
    for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) {
        props.push(p);
      }
    }
    return props;
  };
}

function curry(fn) {
  return function judge(...arg) {
    return fn.length > args.length
      ? (...args1) => judge(...args, ...args1)
      : fn(...arg);
  };
}

function checkType(obj) {
  const type = Object.prototype.toString.call(obj)
  return type.slice(8,-1)
}

function deepClone(obj, hash = new WeakMap()) {
  if (checkType(obj) === 'RegExp') {
    let temp = new RegExp(obj.source, obj.flags)
    temp.lastIndex = obj.lastIndex
    return temp
  }

  if (checkType(obj) === 'Date') {
    return new Date(obj)
  }
  if (obj===null|typeof obj !=='object') {
    return obj
  }
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let newObj = new obj.constructor()
  has.set(obj, newObj)

  Reflect.ownKeys(obj).forEach(function(key) {
    if (typeof obj[key] ==='object'&&obj[key]!==null) {
      newObj[key] = deepClone(obj[key], hash)
    } else {
      Object.defineProperty(newObj, key, Object.getOwnPropertyDescriptor(obj, key))
    }
  })
  return newObj
}

function deepCopy(ori) {
  const type = getType(ori)
  let copy
  switch(type) {
    case 'array': return copyArray(ori, copy)
    case 'object': return copyObject(ori, copy)
    case 'function': return copyfunction(ori, copy)
    default: return ori
  }
}
function copyArray(ori, copy = []) {
  for (const [index, value] of ori.entries()) {
    copy[index] = deepCopy(value)
  }
  return copy
}
function copyObject(ori, copy = {}) {
  for (const [key, value] of ori.entries()) {
    copy[key] = deepCopy(value)
  }
  return copy
}
function copyFunction(ori, copy = () => {}) {
  const fun = eval(ori.toString())
  fun.prototype = ori.prototype
  return fun
}

function debounce(func, wait) {
  let timeout
  return function() {
    let context = this
    let arg = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

window.onscroll = debounce(function() {
  console.log('debounce')
}, 1000)

function throttle(func, delay) {
  let prevTime = Date.now()
  return function() {
    let curTime = Date.now()
    if (prevTime -prevTime > delay) {
      func.apply(this, arguments)
      prevTime = curTime
    }
  }
}

window.onscroll = throttle(function() {
  console.log('throttle')
}, 1000)

const man = {
  name: 'js',
  age: 22
}

const proxy = new Proxy(man, {
  get: function(target, key) {
    if(key in target) {
      return target[key]
    } else {
      throw new ReferenceError('no exist')
    }
  }
})

//dom
var ele = Element({
  tagName: 'ul',
  props: {'class': 'list'},
  children: [
    Element({tagName: 'li',children: ['item1']})
  ]
})
funtion Element({tagName, props, children}) {
  if (!(this instanceof Element)) {
    return new Element({tagName, props, children})
  }
  this.tagName = tagName
  this.props = props||{}
  this.children= children||[]
}

Element.prototype.render = function() {
  let el = document.createElement(this.target)
  let props = this.props
  let propName
  let propValue
  for (propName in props) {
    propValue = props[propName]
    el.setAttribute(propName, propValue)
  }
  this.children.forEach(function(child) {
    let childEl
    if (child instanceof Element) {
      childEl = child.render()
    } else {
      childEl = document.createTextNode(child)
    }
    el.appendChild(childEl)
  })
  return el
}
document.querySelector('body').appendChild(ele.render());

//中序
var inorderTravelsal = function(root, array = []) {
  if (root) {
    inorderTravelsal(root.left, array)
    array.push(root.val)
    inorderTravelsal(root.right, array)
  }
  return array
}

var inorderTravelsal1 = function(root) {
  let result= []
  let stack = []
  let current = root
  while (current || current.length>0) {
    while(current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    result.push(current.val)
    current = current.right
  }
  return result
}
//中序
var preorderTravelsal = function(root, array = []) {
  if (root) {
    array.push(root.val)
    preorderTravelsal(root.left, array)
    preorderTravelsal(root.right, array)
  }
  return array
}

var preorderTravelsal1 = function(root) {
  let result= []
  let stack = []
  let current = root
  while (current || current.length>0) {
    while(current) {
      stack.push(current)
      result.push(current.val)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }
  return result
}
//二叉树重建
var reConstructBinaryTree = function(pre, vin) {
  if (pre.length == 0) {
    return null
  }
  if (pre.length == 1) {
    return new TreeNode(pre[0])
  }
  var value = pre[0]
  var index = vin.indexOf(val)
  var vinleft = vin.slice(0, index)
  var vinright = vin.slice(index+1)
  var preleft = pre.slice(1, index+1)
  var preright = pre.slice(index+1)
  var node = new TreeNode(value)
  node.left = reConstructBinaryTree(preleft, vinleft)
  node.right = reConstructBinaryTree(preright, vinright)
  return node
}
//二叉树的遍历
let pre
let vin
while((pre = readline())!=null) {
  vin = readline()
  print(getHrd(pre, vin))
}
function getHrd(pre, vin) {
  if (!pre) {
    return ''
  }
  if (pre.length == 1) {
    return pre
  }
  var head = pre[0]
  var splitIndex = vin.indexOf(head)
  var vinleft = vin.substring(0,splitIndex)
  var vinright = vin.substring(splitIndex+1)
  var preleft = pre.substring(1, splitIndex+1)
  var preright = pre.substring(splitIndex+1)
  return getHrd(preleft, vinleft)+getHrd(preright, vinright)+head
}

//镜像二叉树
function isSymmetrical(pRoot) {
  return isSymmetricalTree(pRoot, pRoot)
}
function isSymmetricalTree(node1, node2) {
  if (!node1&& !node2) {
    return true
  }
  if (!node1 ||!node2) {
    return false
  }
  if (node1.val!=node2.val) {
    return false
  }
  return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left)
}

//源二叉树的镜像
function mirror(root) {
  if (root) {
    const temp = root.right
    root.right = root.left
    root.left = temp
    mirror(root.right)
    mirror(root.left)
  }
}

// 二叉树，找出其最大深度 深度优先 + 分治
funtion TreeDepth(root) {
  return !root ? 0: Math.max(TreeDepth(root.left), TreeDepth(root.right)) +1
}
// 最小深度
function TreeMinDepth(root) {
  if (!root) return 0
  if (!root.left) {
    return 1+TreeMinDepth(root.right)
  }
  if (!root.right) {
    return 1+TreeMinDepth(root.left)
  }
  return Math.min(TreeMinDepth(root.right), TreeMinDepth(root.left))+1
}

// 平衡树
function isBalanced(root) {
  if (!root) {
    return true
  }
  if (Math.abs(depth(root.left)- depth(root.right))>1) {
    return false;
  }
  return isBalanced(root.left) && isBalanced(root.right)

  function depth(root) {
    if (!root) {
      return 0
    }
    var left = depth(root.left)
    var right = depth(root.right)
    return Math.max(left, right) + 1
  }
}
