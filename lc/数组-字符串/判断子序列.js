/*
* 392. 判断子序列
给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
进阶：
如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？
*/

/*
* 思路： 双指针均指向头部，i不变，j从首位开始移动，当值相同时，i++,j++，i=max或者 j =max 时，看另一个是否到头
* */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  let i = 0
  let j = 0
  while(i < s.length && j < t.length) {
    if(t[j] === s[i]) {
      i++
    }
    j++
  }
  return i === s.length
};