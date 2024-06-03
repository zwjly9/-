/*
* 643. 子数组最大平均数 I
给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。
请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数
任何误差小于 10-5 的答案都将被视为正确答案。
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
  let len = nums.length
  let start = 0, end = k - 1
  let tempMax = 0
  for(let i = start ; i <= end; i++) {
    tempMax += nums[i]
  }
  let max = tempMax
  while(end < len - 1 ) {
    end++
    tempMax = tempMax + nums[end] - nums[start]
    max = Math.max(tempMax,max)
    start++
  }
  return max
};
let nums = [4,2,1,3,3], k = 2
findMaxAverage(nums, k)