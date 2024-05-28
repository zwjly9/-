/*
* 1768. 交替合并字符串
给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。
返回 合并后的字符串 。
* */

/*
* 思路：
* 双指针 分别指向两个字符串的首位，如果没有超出当前字符串的长度，则向res中添加元素
* 复杂度：
* 时间O(n + m) 空间O(n + m)
*
* */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
  let left = 0, right = 0, l1 = word1.length, l2 = word2.length
  let res = []
  while(left < l1 || right < l2) {
    if(left < l1) {
      res.push(word1[left])
      left++
    }
    if(right < l2) {
      res.push(word2[right])
      right++
    }
  }
  return res.join('')
};
