var maxOperations = function (nums, k) {
  // 双指针  -> 快排
  nums.sort((a,b)=> a - b)
  let count = 0
  let left = 0, right = nums.length - 1
  while(left < right) {
    const sum = nums[left] + nums[right]
    // l + r > k r--  l+r < k l++  =k l++r--
    if(sum > k) {
      right--
    }else if(sum < k) {
      left++
    }else {
      count++
      left++
      right--
    }
  }
  return count
};
/*
* 哈希表
* 一次遍历，将元素存在map中，形式为 nums[i]: count。新元素时，优先判断是否map中是否有  k-nums[i]  有的话进行数值减1,此时指针元素不需要处理，如果没有，则对应加1或者存储新元素
* */
var maxOperationsHas = function (nums, k) {
  let count = 0
  let numMap = new Map()
  for(let i = 0; i < nums.length; i++) {
    let reduce = k - nums[i]
    if(reduce > 0 ) {
      if(numMap.has(reduce) && numMap.get(reduce) > 0) {
        count++
        numMap.set(reduce, numMap.get(reduce) - 1)
      }else {
        numMap.has(nums[i]) ? numMap.set(nums[i], numMap.get(nums[i]) + 1) : numMap.set(nums[i], 1)
      }
    }
  }
  return count
};

let nums = [2,5,4,4,1,3,4,4,1,4,4,1,2,1,2,2,3,2,4,2], k = 3
console.log(maxOperationsHas(nums, k))