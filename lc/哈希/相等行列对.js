var equalPairs = function(grid) {
  let map = new Map()
  for (const item of grid) {
    let str = item.join(',')
    map.has(str) ? map.set(str, map.get(str) + 1) : map.set(str, 1)
  }
  let count = 0
  for(let i = 0; i < grid.length; i++) {
    let colunm = []
    for(let j = 0; j < grid[i].length; j++) {
      colunm.push(grid[j][i])
    }
    let temp = colunm.join(',')
    if(map.has(temp)) {
      count += map.get(temp)
    }
  }
  return count
};
var grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
equalPairs(grid)