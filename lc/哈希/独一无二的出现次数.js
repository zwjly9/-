var uniqueOccurrences = function(arr) {
  let map = new Map()
  for(const i of arr) {
    map.has(i) ? map.set(i, map.get(i) + 1) : map.set(i, 1)
  }
  let set = new Set()
  map.forEach((value) => {
    if(!set.has(value)) {
      set.add(value)
    }
  })
  return map.size === set.size
};

let arr= [1,2,3,4]
console.log(uniqueOccurrences(arr));