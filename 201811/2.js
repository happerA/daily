Function.prototype.bind = function (context) {
  let self = this
  let arg = Array.prototype.slice.call(this.arguments, 1)
  let fNOP = function () { }
  let fbind = function () {
    let bindArg = Array.prototype.slice.call(arguments)
    self.apply(context, arg.concat(bindArg))
  }
  fNOP.prototype = this.prototype
  fbind.prototype = new fNOP()
  return fbind
}

//leetcode
/**
 * two sum 找到无序数组中和为定值的两个数，返回下标
 */
const towSum = (nums, target) => {
  let map = {}
  nums.forEach((num, index) => {
    map[num] = index
  });
  for (let i = 0; i < nums.length; i++) {
    const otherIndex = map[target - nums[i]]
    if (otherIndex && otherIndex !== i) {
      return [Math.min(otherIndex, i), Math.max(i, otherIndex)]
    }
  }
}

/**
 * Valid Parentheses 判断输入的字符串是不是只包含(, ), {, }, [ and ]
 */
const isValid = (string) => {
  let stack = []
  const hmap = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  for (let index = 0; index < s.length; index++) {
    const char = s[index];
    if (char in hmap) {
      stack.push(hmap[char])
    } else if (char !== stack.pop()) {
      return false
    }
  }

  return stack.length === 0
}

/**
 * Merge Two Sorted Lists 合并两个已排序的链表并将其作为新链表返回。新链表应该通过拼接前两个链表的节点来完成。
 */

const mergeTwoList = (l1, l2) => {
  if (!l1) return l2
  if (!l2) return l1
  if (l1.val < l2.val) {
    l1.next = mergeTwoList(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoList(l2.next, l2)
    return l2
  }
}
/**
 * 35. Search Insert Position 给定排序数组和目标值，如果找到目标，则返回索引。如果没有，请返回索引按顺序插入的索引
 */
const searchInsert = (nums, target) => {
  let start = 0
  let end = nums.length - 1
  let mid = Math.ceil((start + end) / 2)
  while(num[mid]!==target) {
    if (end<=start) {
      return num[end]<target ? end+1 : end
    }
    if(num[mid]>target) {
      end = Math.max(mid-1, 0)
    }
    else {
      start = Math.min(mid+1, nums.length-1)
    }
    mid = Math.floor((end + start) / 2);
  }
  return mid
}

/**
 * Maximum Subarray 经典题：找一个数组中最大子序列和
 */
const maxSubArray = (nums) => {
  let cache = 0
  let max = -Infinity
  nums.forEach(num => {
    cache += num
    if (cache > max) {
      max = cache
    }
    if (cache<0) {
      cache = 0
    }
  })
  return max
}

/*
*  Climbing Stairs跳台阶，经典DP
*/
const climbStairs = (n) => {
  dp = [0, 1, 2]
  for (let index = 3; index < n; index++) {
    dp[n] = dp[n-1] + dp[n-2]
  }
  return dp[n]
}

/*
* Same Tree 判断俩二叉树是不是完全相同 不好的写法：利用短路等特性把代码写在一行，注意做取值保护
*/
const isSameTree = (p, q) => {
  return (p||q) ? (p||{}).val === (q|| {}).val && isSameTree((p||{}).left, (q||{}).left) && isSameTree((p||{}).right, (q||{}).right) : true
}

/**
 * Symmetric Tree判断一颗二叉树是不是镜像
 */
const isSymmetric = (root) => {
  return childIsSymmetric((root || {}).left,(root || {}).right)
}
const childIsSymmetric = (left, right) => {
  return (left||right) ? (left||{}).val === (right|| {}).val && isSameTree((left||{}).left, (right||{}).right) && isSameTree((left||{}).right, (right||{}).left) : true
}

/*
* Maximum Depth of Binary Tree找二叉树深度
*/
var maxDepth = function(root, deep=0) {
  if(!root) return deep;
  return Math.max(maxDepth(root.left) + 1, maxDepth(root.right) + 1);
};

/**
 * Single Number 一个数组中除了一个数字外，其余数字均出现两次，找出只出现一次的数字。要求线性复杂度
 * 方法：两个相同的数字异或得0，一个数字和0异或结果是它本身
*/

const singleNumber = (nums) => {
  return nums.reduce((a, b) => a^b)
}

/**
 * Best Time to Buy and Sell Stock给一个数组，其中第i个元素是第i天给定股票的价格。
 * 只能进行一次买进和卖出，求最大利润首先设定最大利润和最低价格：如果当前这一天的股票价格比最低价格还小，那就把最低价格设置为这一天的股票价格。
 * 如果最大利润比当天价格减掉最低价格还要低，那就把最大利润设置成当天价格减去最低的价格。
 */
const maxProfit = (prices) => {
  let minprofit = Infinity
  let maxprofit = -Infinity
  prices.forEach(price => {
    if (price<minprofit) {
      minprofit = price
    }
    if(maxprofit<price-minprofit) {
      maxprofit = price-minprofit
    }
  })
  return maxprofit
}

/**
 *  Linked List Cycle
 * 判断链表是否有环，不能使用额外空间 解法：用两个指针，快指针每次走两步，慢指针每次走一步。这样每走一次快指针比慢指针多一步，如果有环最终能够相遇。
*/
const hasCycle = (listNode) => {
  let slow = listNode
  let fast = listNode
  while (fast) {
    slow = slow.next
    fast = fast.next && fast.next.next
    if(fast && fast===slow) {
      return true
    }
  }
  return false
}

/***
 * Min Stack
 * 设计一个支持push，pop，top和在恒定时间内检索最小元素的堆栈。
 * push(x) -- 将元素x推入堆栈
 * pop() --  删除堆栈顶部的元素
 * getMin() -- 检索堆栈中的最小元素
 * top() -- 获取顶部元素
 * 最优解 - O(1)：
 * 该题要求的是实现一个栈，栈的修改元素的操作只有 pop() 和 push(x)，因此我们可以在 push 的时候维护一个作用类似于 缓存 的，记录这个时候最小元素是什么的栈 minStack。在每次 push 的时候，更新一下我们的缓存，这个时候只需要对比一下当前入栈元素和 minStack 栈顶元素，然后取小的推入 minStack 即可，代表着这个时候最小值应该是 之前栈中最小的 和 新来的 中最小的一个元素。
 */

class MinStack {
  constructor() {
    this.stack = []
    this.minStack = []
  }
  push(x) {
    this.stack.push(x)
    const lastMinNum = this.minStack[this.minStack.length-1]
    this.minStack.push(Math.min(x, lastMinNum===undefined ? Infinity: lastMinNum))
  }
  pop() {
    this.stack.pop()
    this.minStack.pop()
  }
  top() {
    return this.stack[this.stack.length-1]
  }
  getMin() {
    return this.minStack[this.minStack.length-1]
  }
}

/**
 * Intersection of Two Linked Lists 找到两个单链表公共开头的节点。
 * 简便的做法是求出两链表长度差diff后，让长的链表先走diff步，然后依次比较两链表节点，若相同则返回
*/
const getIntersectionNode = (headA, headB) => {
  let nodeA = headA
  let nodeB = headB
  while (nodeA!==nodeB) {
    nodeA = nodeA ? nodeA.next : headB
    nodeB = nodeB ? nodeB.next : headA
  }
  return nodeA || null
}

/**
 *  House Robber
 * DP：对于第i个房间我们的选择是偷和不偷
 * 如果决定是偷，则第 i-1 个房间必须不偷，那么这一步的就是 dp[i] = nums[i-1] + dp[i -2] , 假设dp[i]表示打劫到第 i 间房屋时累计取得的金钱最大值
 * 如果是不偷， 那么上一步就无所谓是不是已经偷过， dp[i] = dp[i -1]
 * 因此 dp[i] = max(dp[i - 2] + nums[i - 1], dp[i - 1] )
 * 你是一名专业强盗，计划沿着一条街打家劫舍。每间房屋都储存有一定数量的金钱，唯一能阻止你打劫的约束条件是：由于房屋之间有安全系统相连，如果同一个晚上有两间相邻的房屋被闯入，它们就会自动联络警察，因此不可以打劫相邻的房屋。给定一列非负整数，代表每间房屋的金钱数，计算出在不惊动警察的前提下一晚上最多可以打劫到的金钱数。
 */
const rob = (nums) => {
  if (!nums.length) return 0
  let dp = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i-1], (dp[i-2] || 0)+nums[i-1])
  }
  return dp[nums.length-1]
}

/**
 * Reverse Linked List
 * 反转链表
*/
const reverseList = (list) => {
  if (!list) return list
  let start = list
  let end = list
  while (end.next) {
    let node =end.next
    end.next = node.next
    node.next = start
    start = node
  }
  return start
}
const reverseList1 = (head,pre) => {
  if (!head) return head
  const next = head.next
  head.next = pre || null
  return next ? reverseList1(next, head) : head
}

/**
 * Invert Binary Tree
 * 反转二叉树
 */
const invertTree = (root) => {
  if(!root) return []
  [root.left, root.right] = [root.right, root.left]
  invertTree(root.left)
  invertTree(root.right)
  return root
}

/**
 * Palindrome Linked List
 * 判断一个链表是不是回文，要求 O(n) 时间， O(1) 空间
 * 本题暴力解法就是遍历完链表后转为字符串，然后看是不是回文，符合时间复杂度要求，但是不符合空间复杂度要求
 * 要求 O(1) 的空间，那就只能从链表本身动手了。首先判断回文无非就是从两边到中间或者从中间到两边。由于我们可以对链表本身动手，那就考虑让链表能够倒着访问（因为要求O(1)空间，所以不能直接改造为双向链表）。由于我们只能让链表顺着一个方向走，所以可以想到选择从中间到两边的方式，左边的向前(pre)，右边的向后(next)。
 * 那么我们如何找到中间的节点呢 - 中间节点即为链表的一半，那我们使用一个快指针一次走两步，一个慢指针一次走一步，那么快指针走到尾时，慢指针应该走到链表中间。同时要注意区分链表长度是奇数还是偶数：如果是奇数的话，正中间的节点不需要做判断，应该用它前后两个节点开始比较。
 */
const isPalindrome = (head) => {
  if (!head) return true
  if (!head.next) return false
  let fast = head.next
  let slow = head
  let pair = null
  while (fast!==null&& fast.next !==null) {
    slow.next.pre = slow
    slow = slow.next
    fast = fast.next.next
  }

  if (!fast||!fast.next) {
    pair = slow.next
    slow = slow.pre
  } else {
    pair = slow.next
  }
  while (pair) {
    if (pair.val!==slow.val) return false
    pair = pair.next
    slow = slow.pre
  }
  return true
}

/**
 * Move Zeroes
 * 给定一个数组nums，写一个函数将所有0移动到它的末尾，同时保持非零元素的相对顺序。
 * 额外要求：
 * 您必须在不制作数组副本的情况下就地执行此操作
 * 最小化操作总数。
 * 思路：
 * 最小化操作：遍历一遍的过程中操作完，且不需要额外移动操作
 * 记 zero 的个数为 zeroesNums ，然后将每一个非零的数向前移动 zeroesNums ，最后在数组末尾填上 zero
*/
const moveZeroes = (nums) => {
  let zeroNums = 0
  nums.forEach((num, index) => {
    if (num === 0) {
      zeroNums++
    } else {
      nums[i-zeroNums] = num
    }
  })

  for (let index = nums.length-1; zeroNums >0; index--) {
    nums[index] = 0
    zeroNums--
  }
  return nums
}

/*
 * Path Sum III
 * 给一颗每个节点都是整数（可正可负）的二叉树，求有多少条路径加起来等于一个给定值。注意，路径不需要在根或叶子处开始或结束，但必须向下（即仅从父节点行进到子节点）。
 * 解法一：
 * 暴力解，使用 BFS 和递归来搜索符合条件的路径。需要注意的是这种方法没有利用任何缓存，即计算每条路径和的时候都重新遍历了所有路径节点。时间复杂度为 O(n²)
*/

/**
 * Merge Two Binary Trees
 */
const mergeTree = (t1, t2) => {
  if(!t1) return t2
  if(!t2) return t1
  t1.val += t2.val
  t1.left = mergeTree(t1.left, t2.left)
  t1.right = mergeTree(t1.right, t2.right)
  return t1
}

/**
 * 平面上有若干个不特定的形状，如下图所示。请写程序求出物体的个数，以及每个不同物体的面积。
 * 分析
 * 想要知道有多少个图形，想到的就是先获取图片中的每一个像素点然后判获取像素点的背景颜色（RGBA）。想要获得图片中的每一个像素点，那就可以联想到使用h5的canvas。
*/
const numsArea = () => {
  let ctx = canvans.getContext('2d')
  let img = new Image()
  img.src = './image.png'
  img.onload = () => {}

  // 创建存储图片像素点的二维数组
  let coordinates = []
  for (let i = 0; i<200;i++) {
    coordinates[i] = []
  }

  // 获取像素点，也就是使用getimagedata方法。
  ctx.drawImage(img, 0, 0)
  let data= ctx.getImageData(0,0,350, 200).data

  let x= 0
  let y = 0
  for (let i = 0, len = data.length; i<len;i+=4) {
    let red= data[i]
    let green= data[i+1]
    let blue= data[i+2]
    let alpha= data[i+3]
    if (`${red} ${green} ${blue}` == '210 227 199') {
      coordinates[y][x] = 0
    } else {
      coordinates[y][x] = 1
    }
    x++
    if (x>350) {
      y++
      x =0
    }
  }


  // 连续面积和个数
  const getAreaAndNum = () => {
    let sum = []
    let count = 0
    for(let i = 0;i<h;i++) {
      for(let j=0;j<w;j++) {
        if (coordinates[i][j]==1) {
          let buf = 0
          buf = linkSum(i,j,buf)
          count++
          sum.push({index: count, area: buf})
        }
      }
    }
    return {sum, count}
  }

  const linkSum = (i,j,num) => {
    coordinates[i][j] = 0
    num++
    if ((i+1<h) && coordinates[i+1][j]==1) {
      num = linkSum(i+1, j, num)
    }
    if ((i-1>=0) && coordinates[i-1][j]==1) {
      num = linkSum(i-1, j, num)
    }
    if ((j+1<w) && coordinates[i][j+1]==1) {
      num = linkSum(i, j+1, num)
    }
    if ((j-1>=0) && coordinates[i][j-1]==1) {
      num = linkSum(i, j-1, num)
    }
    return num
  }
}

/*二叉搜索树上的每一个节点要加上所有大于他的节点的值：原始BST的每个 key 都更改为原始 key 加上大于BST中原始 key 的所有 key 的总和。
解法一：

BST的性质如下

若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
它的左、右子树也分别为二叉排序树。


使用 右->中->左的顺序从大到小遍历，并利用 cacheVal 来缓存比当前节点大的值来达到 O(n) 的时间复杂度
在递归中进行 cacheVal 的传递而不是在外层保存该值（麻烦一点，因为需要处理右子树最左节点：代码29行）
因为右子树最左节点的只是除了当前节点以外最小的，所以右子树最左节点的值为最大的（所有比当前节点大的节点加起来的值）。因此当前节点只需要加上右子树最左节点的值即可
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const countBST = (root) => {
  if (root) {
    countVal(root)
    return []
  } else {
    return []
  }
}

function countVal(root, val = 0) {
  if (root.right) {
    val = countVal(root.right, val)
  }
  root.val+= val
  val = root.val
  if (root.left) {
    return countVal(root.left, val)
  }
  return root.val
}

/**
 * Hamming Distance
 * Hamming Distance 表示两个等长字符串在对应位置上不同字符的数目，也度量了通过替换字符的方式将字符串x变成y所需要的最小的替换次数。
 * 1.常规解法：转成二进制以后一位一位的算，需要手动补位或手动判断 undefine

 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const Hamming = (x, y) => {
  let binaryX = x.toString(2)
  let binaryY = y.toString(2)
  const len = Math.max(binaryX.length, binaryY.length)
  if (binaryX.length < len) {
    binaryX = binaryX.padStart(len, '0')
  } else {
    binaryY = binaryY.padStart(len, '0')
  }
  let result = 0
  for (let index = len-1; index >= 0; index--) {
    const element = array[index];
    if (binaryY[index]!==binaryX[index]) {
      result++
    }
  }
  return result
}

/**
 * Find All Numbers Disappeared in an Array
 * 常规解法：因为题目上给出条件说数组里的数字都在 [1, n]，且要求不适用额外空间，因此可以想到该题为套路题：对原位置上的数字移动/加减/位运算等解法。
 * 此题常规可以选用反转对应位置上数字的方法：把出现的数字的对应位上的数字变为负数，然后遍历找出那些正数，其下标+1则为没有出现过的数字
 * @param {number[]} nums
 * @return {number[]}
 */


// 广度预先
function wideTraversal(node, nodes=[node],i=0){

  if(nodes[i]!=null){
  console.log(nodes[i].children)
      nodes[i].children.length&&nodes.push(...nodes[i].children);
  i++
      wideTraversal(nodes[i], nodes, i);
  }
  return nodes;
}

//深度
function deepTraversal(node, nodelist= []){

  if(node!=null){
      nodelist.push(node);
      let childrens=node.children;
      for(let i=0;i<childrens.length;i++)
          deepTraversal(childrens[i],nodelist);
  }
  return nodelist;
}