var asteroidCollision = function (asteroids) {
  let arr = []
  for (const item of asteroids) {
    let status = true
    while(status && arr.length > 0 && arr[arr.length -1] > 0 && item < 0) {
      const sum = arr[arr.length -1] + item
      if(sum >= 0) {
        status = false
      }
      if(sum <= 0) {
        arr.pop()
      }
    }
    if(status) {
      arr.push(item)
    }
  }
  return arr
};
let asteroids = [-2,-2,1,-2]
console.log(asteroidCollision(asteroids));