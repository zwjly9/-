/*
* 1. str.length ===
* 2. 字母的次数相同（字母可以不同）
* 3. 出现的字母类型一致
* */
var closeStrings = function(word1, word2) {
  // 1
  if(word1.length !== word2.length) return false
  // 2
  const ASCII_A = 'a'.charCodeAt(0)
  let word1Mask = 0
  let word2Mask = 0
  const word1Count = Array(26).fill(0)
  const word2Count = Array(26).fill(0)
  for(const c of word1) {
    word1Count[c.charCodeAt(0) - ASCII_A]++
  }
  for(const c of word2) {
    word2Count[c.charCodeAt(0) - ASCII_A]++
  }
  for(let i = 0; i < 26; i++) {
    if((word1Count[i] === 0 && word2Count[i] !== 0) || (word1Count[i] !== 0 && word2Count[i] === 0)) {
      return false
    }
  }
  word1Count.sort((a,b) => a - b)
  word2Count.sort((a,b) => a - b)
  return _.isEqual(word1Count, word2Count)
};

function compareKey(a,b) {
  let map1 = new Map()
  let map2 = new Map()
  for (const w of a) {
    map1.has(w) ? map1.set(w, map1.get(w) + 1) : map1.set(w, 1)
  }
  for (const w of b) {
    map2.has(w) ? map2.set(w, map2.get(w) + 1) : map2.set(w, 1)
  }

  return aKeySet.size === keySize
}