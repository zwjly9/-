/*
* 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
返回 k 。
*/
var removeDuplicates = function(nums) {
  let slow = 1, fast = 1, len = nums.length
  if(len === 0) {
    return 0
  }
  while(fast < len) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++
  }
  return slow
};

// 进阶

/*
给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
* */
var removeDuplicates = function(nums) {
  let s = 2, f = 2, len = nums.length
  if(len < 2) {
    return len
  }
  while(f < len) {
    if(nums[s - 2] !== nums[f]) {
      nums[s] = nums[f]
      s++
    }
    f++
  }
  return s
};