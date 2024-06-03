/*
1456. 定长子串中元音的最大数目
给你字符串 s 和整数 k 。
请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
英文中的 元音字母 为（a, e, i, o, u）。
* */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
  let vol = 'aeiou'
  let i = 0, sum = 0, count = 0
  for(;i < k ;i++) {
    let str = s.charAt(i)
    if(vol.indexOf(str) !== -1) {
      count++
    }
  }
  sum = Math.max(sum, count)
  for(;i < s.length; i++)  {
    let end = s.charAt(i)
    let start = s.charAt(i - k)
    if(vol.indexOf(end) !== -1) count++
    if(vol.indexOf(start) !== -1) count--
    sum = Math.max(sum, count)
  }
  return sum
};
let s = "abciiidef", k = 3
maxVowels(s, k)