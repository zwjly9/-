/*
* 605. 种花问题
假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
给你一个整数数组 flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false 。
* */

/*
* 思路：
* 贪心算法
* 只要存在000，即可种花，即 i-1,i,i+1为0，计数n-1，遍历看最终计数是否为0
* 处理首末位置边界，在首位和末尾插入0
* 复杂度：
* 时间复杂度：O(n)
* 空间复杂度：O(1)
* */

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
  flowerbed.push(0)
  flowerbed.unshift(0)
  for(let i = 1; i < flowerbed.length - 1; i++) {
    if(flowerbed[i-1] === 0 && flowerbed[i] === 0 && flowerbed[i+1] === 0) {
      n--
      flowerbed[i] = 1
    }
  }
  return n <= 0
};