/*
1004. 最大连续1的个数 III
给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回 数组中连续 1 的最大个数 。
* */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
  let left = 0, right = 0,len = nums.length - 1,count = 0,max= 0
  for(;right <= len; right++) {
    if(nums[right]) {
      k--
    }
    while(k < 0) {
      if(nums[left] === 0) {
        k++
      }
      left++
    }
    count = right - left + 1
    max = Math.max(count, max)
  }
  return max
};
let nums =[1,1,1,0,0,0,1,1,1,1,0], k = 2
console.log(longestOnes(nums, k));