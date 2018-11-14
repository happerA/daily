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