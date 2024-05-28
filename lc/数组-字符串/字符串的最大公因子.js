/*
* 1071. 字符串的最大公因子
对于字符串 s 和 t，只有在 s = t + t + t + ... + t + t（t 自身连接 1 次或多次）时，我们才认定 “t 能除尽 s”。
给定两个字符串 str1 和 str2 。返回 最长字符串 x，要求满足 x 能除尽 str1 且 x 能除尽 str2 。
 */

/*
* 思路：
* 先判断两个字符串是否存在最大公因子， 如果 a + b  = b + a 说明存在最大公因子
* 欧几里得算法， 两个数的最大公因子 等于 较小的数和 两数相除的余数的最大公因子
* 循环求两数相除的余数，直到最小数为0,即可获取最小公因子的索引
* 复杂度：
* 时间复杂度：O(n) ，字符串拼接比较是否相等需要 O(n) 的时间复杂度，求两个字符串长度的最大公约数需要 O(logn) 的时间复杂度
* 所以总时间复杂度为 O(n+logn)=O(n)
* 空间复杂度：拼接字符串所需的O(n) 建立了中间变量用来存储 str1 与 str2 的相加结果。
*
* */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
  if(str1 + str2 !== str2 + str1) return
  const gcd = (a , b) =>  b === 0 ? a : gcd(b, a % b)
  return str1.substring(0, gcd(str1.length, str2.length))
};