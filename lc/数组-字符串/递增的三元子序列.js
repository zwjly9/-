/*
* 334. 递增的三元子序列
给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。
如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。
* */

/*
* 思路：
* 双向遍历
* 指定元素i，计算的前缀最小值和后缀最大值，判断 是否存在 min < i < max
* 时间复杂度：O(n)
* 空间复杂度：O(n)
*
* 优化： 贪心算法，1，2，3三个索引分别指向0, +∞, 然后遍历3，存在3种情况
* 1.  索引3的值比索引2的大，此时是 1 < 2 < 3， 结果成立
* 2.  索引3的值比索引1的大，比索引2的小，那么索引2指向索引3的位置，继续
* 3.  索引3的值比索引1的小，那么将索引1指向索引3的位置，虽然索引1的位置在索引3后面，但是老的索引1在3前面，仍然可以
* 时间复杂度：O(n)
* 空间复杂度：O(1)
* */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
  let len = nums.length
  if(len < 3) return false
  let leftMin = Array(len).fill(0)
  let rightMax = Array(len).fill(0)
  leftMin[0] = nums[0]
  rightMax[len-1] = nums[len-1]
  for(let i = 1; i < len; i++) {
    leftMin[i] = Math.min(nums[i], leftMin[i - 1])
  }
  for(let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(nums[i], rightMax[i+1])
  }
  for(let i = 1; i < len - 1; i++) {
    if(nums[i] > leftMin[i - 1] && nums[i] < rightMax[i + 1]) {
      return true
    }
  }
  return false
};

var increasingTripletPlus = function(nums) {
  const len = nums.length
  if(len < 3) return false
  let first = nums[0], second = Number.MAX_VALUE
  for(let i = 1; i < len; i++) {
    if(nums[i] > second) return true
    if(nums[i] < first) {
      first = nums[i]
    }
    if(nums[i] > first && nums[i] < second) {
      second = nums[i]
    }
  }
  return false
};