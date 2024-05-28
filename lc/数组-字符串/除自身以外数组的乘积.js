/*
238. 除自身以外数组的乘积
给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
* */

/*
* 思路：
  不能使用除法，计算该元素的前缀积和后缀积，结果为前缀积*后缀积
* 复杂度：
* 时间复杂度：O(n)
* 空间复杂度：O(n)
*
* 优化：计算后缀的同时直接将前缀乘进来，返回后缀结果
* 时间复杂度：O(n)
* 空间复杂度：O(1)
* */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let len = nums.length
  let pre = Array(len)
  let suf = Array(len)
  pre[0] = 1
  suf[len-1] = 1
  for(let i = 1; i < len; i++) {
    pre[i] = pre[i-1] * nums[i-1]
  }
  for(let j = len - 2; j >= 0; j--) {
    suf[j] = suf[j+1] * nums[j+1]
  }
  const ans = Array(n)
  for(let i = 0; i < len; i++) {
    ans[i] = pre[i]*suf[i]
  }
  return ans
};

var productExceptSelfPlus = function(nums) {
  let len = nums.length
  let suf = Array(len)
  suf[len-1] = 1
  for(let j = len - 2; j >= 0; j--) {
    suf[j] = suf[j+1] * nums[j+1]
  }
  let pre = 1
  for(let i = 0; i < len; i++) {
    suf[i] *= pre
    pre *= nums[i]
  }
  return suf
};