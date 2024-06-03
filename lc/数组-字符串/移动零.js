/*
* 283. 移动零
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。*/
/*
* 思路：
* 关注非0元素，只需顺序替换数组前面元素，后面全部补0
* 时间复杂度：O(n)
* 空间复杂度：O(1)
* */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let s = 0;
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] !== 0) {
      nums[s++] = nums[i]
    }
  }
  for(let i = s; i < nums.length; i++) {
    nums[i] = 0
  }
};