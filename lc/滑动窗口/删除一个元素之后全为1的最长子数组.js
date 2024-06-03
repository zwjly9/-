/*
*
1493. 删掉一个元素以后全为 1 的最长子数组
给你一个二进制数组 nums ，你需要从中删掉一个元素。
请你在删掉元素的结果数组中，返回最长的且只包含 1 的非空子数组的长度。
如果不存在这样的子数组，请返回 0 。
* */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
  let point = 1, start = 0, end = 0, len = nums.length - 1
  while(end <= len) {
    if(nums[end] === 0) {
      point--
    }
    if(point < 0) {
      if(nums[start] === 0) {
        point++
      }
      start++
    }
    end++
  }
  return end - start - 1
};

let nums = [1,1,0,1,1,1,0,1,1]
console.log(longestSubarray(nums));