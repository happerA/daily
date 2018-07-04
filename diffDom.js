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