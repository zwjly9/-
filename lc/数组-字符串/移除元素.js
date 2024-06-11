/*
*
* 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
* */

var removeElement = function(nums, val) {
  let left = 0, right = nums.length
  while (left < right) {
    if(nums[left] === val) {
      nums[left] = nums[right -1]
      right--
    }else {
      left++
    }
  }
  return left
};


/*
* 思路：
* 不需要关注数组值的顺序问题，双指针遍历，左指针发现相同值时，将右指针的值赋予给当前位置即可
* */