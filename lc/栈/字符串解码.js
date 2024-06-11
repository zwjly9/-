var decodeString = function (s) {
  // 栈操作的方法解题
  const changeStack = (arr) => {
    let lastStart = arr.findLastIndex(item => {
      return item === '['
    })
    let lastNum = lastStart - 1
    let temp = arr.slice(lastStart + 1 )
    for(let i = 0; i < arr[lastNum] - 1; i++) {
      arr = arr.concat(temp)
    }
    arr.splice(lastNum, 2)
    return arr
  }

  let stack = []
  let i = 0
  while (i < s.length) {
    if (s[i] === ']') {
      // 出栈
      stack = changeStack(stack)
    } else {
      // 数字
      if(!isNaN(Number(s[i]))) {
        let j = i + 1
        while(j < s.length) {
          if(!isNaN(Number(s[j]))) {
            j++
          } else {
            break
          }
        }
        let number = Number(s.substring(i,j))
        i = j - 1
        stack.push(number)
      }else {
        stack.push(s[i])
      }

    }
    i++
  }
  return stack.join('')
};
let a = '100[leetcode]'
console.log(decodeString(a));
