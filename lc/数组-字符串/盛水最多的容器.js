/*
*
11. 盛最多水的容器
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
返回容器可以储存的最大水量。
*/

/*
* 思路：
* 双指针，分别指向数组首尾的位置，最大值为min(i,j) * (j -i),移动两个指针中较小的一个，直到两个指针重合，过程中记录的最大值即为所需
* 时间复杂度：O(n)
* 空间复杂度：O(1)
* */

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let left = 0, right = height.length - 1
  let sum = 0
  while(left !== right) {
    if(height[left] > height[right]) {
      sum = Math.max(sum, height[right]*(right-left))
      right--
    }else {
      sum = Math.max(sum, height[left]*(right-left))
      left++
    }
  }
  return sum
};