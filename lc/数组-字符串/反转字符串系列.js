/*
345. 反转字符串中的元音字母
给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。
元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。
* */

/*
* 思路：
  双指针: 分别指向字符串的首位和末位，当两个指针所指的位置都是元音字母时，交换两个元素位置，指针继续移动，直到左 > 右
* 复杂度：
* 时间复杂度：O(n)
* 空间复杂度：O(n)
* */

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
  let len = s.length
  let left = 0, right = len - 1
  let res = Array.from(s)
  while(left < right) {
    if(hasChar(res[left]) && hasChar(res[right])) {
      changePosition(res, left, right)
      left++
      right--
    } else {
      if(!hasChar(res[left])) {
        left++
      }
      if(!hasChar(res[right])) {
        right--
      }
    }
  }
  return res.join('')
};
const hasChar = (char) => {
  let standardArr = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  return standardArr.indexOf(char) >= 0
}
const changePosition = (arr, left, right) => {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}

/*
*
151. 反转字符串中的单词
给你一个字符串 s ，请你反转字符串中 单词 的顺序。
单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
输入：s = "the sky is blue"
输出："blue is sky the"
* */

/*
* 思路：
  先将字符串去掉首尾空格，设两个指针均指向字符串末位，一个指针不动，另一个指针向前移动，当该指针的前一位是空时，即两个指针所在的位置即为一个单词，填入结果数组；前指针继续向前移动，移到非空字符时，将两个指针均指向此处
* 复杂度：
* 时间复杂度：O(n)
* 空间复杂度：O(n)
* */

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let temp = s.trim()
  let len = temp.length - 1, i = len, j = len
  let res = []
  while(i >= 0) {
    while(i >= 0 && temp.charAt(i) !== ' ') {
      i--
    }
    // 单词索引i + 1, j， 所以slice为 i+1, j+1
    res.push(temp.slice(i+1, j+1))
    while(i >= 0 && temp.charAt(i) === ' ') {
      i--
    }
    j = i
  }
  return res.join(' ')
};

let s = "the sky is blue"
const m = reverseWords(s)
console.log(m);