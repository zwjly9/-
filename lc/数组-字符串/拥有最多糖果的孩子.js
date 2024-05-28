/*
* 1431. 拥有最多糖果的孩子
给你一个数组 candies 和一个整数 extraCandies ，其中 candies[i] 代表第 i 个孩子拥有的糖果数目。
对每一个孩子，检查是否存在一种方案，将额外的 extraCandies 个糖果分配给孩子们之后，此孩子有 最多 的糖果。注意，允许有多个孩子同时拥有 最多 的糖果数目。
 */

/*
* 思路：
* 寻找整个数组的最大值，最大值与差值大于索引值即存在
* 复杂度：
* 时间复杂度：O(n)
* 空间复杂度：拼接字符串所需的O(1)
*
* */


/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
  const k = Math.max(...candies) - extraCandies
  return candies.map(i => i >= k)
};
