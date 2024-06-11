var removeStars = function(s) {
  let arr = Array()
  for(let i = 0; i < s.length; i++) {
    if(s[i] === '*') {
      arr.pop()
    } else {
      arr.push(s[i])
    }
  }
  return arr.join('')
};