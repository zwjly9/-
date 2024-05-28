/*
443. 压缩字符串
给你一个字符数组 chars ，请使用下述算法压缩：
从一个空字符串 s 开始。对于 chars 中的每组 连续重复字符 ：
如果这一组长度为 1 ，则将字符追加到 s 中。
否则，需要向 s 追加字符，后跟这一组的长度。
压缩后得到的字符串 s 不应该直接返回 ，需要转储到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符。
请在 修改完输入数组后 ，返回该数组的新长度。
你必须设计并实现一个只使用常量额外空间的算法来解决此问题。
* */

/*
* 思路：
双指针
使用两个指针i, j;如果chars[i] !== chars[j],此时chars[i]指向的元素数量为 j - i;删除数组i和j之间的元素并插入数量,j的索引重置为i + 数量的位数
* 时间复杂度：O(n)
* 空间复杂度：O(1)
* */

/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
  let i = 0, j = 0
  while(j < chars.length ) {
    if(j === chars.length - 1) {
      if(chars[i] === chars[j]) {
        if(j === i) break
        // if(j - i === 1) break
        let sum = changeScale(j-i + 1)
        chars.splice(i+1, j - i + 1, ...sum)
        break
      }
    }
    if(chars[i] === chars[j]) {
      j++
    } else {
      if(j-i === 1) {
        i = j
      } else {
        let sum = changeScale(j-i)
        chars.splice(i+1, j - i - 1, ...sum)
        j = i + Math.max(countDigits(j - i), 2)
        i = j
      }
    }
  }
  return chars
};

const changeScale = (value) => {
  return value >= 10 ? String(value).split('') : String(value)
}

const countDigits = (num) => {
  const numStr = num.toString();
  return numStr.length;
}

let a = ["a","b","b","b","b","b","b","b","b","b","b","b",'c','c','c']
const m = compress(a)
console.log(m);
