/*
2215. 找出两数组的不同
给你两个下标从 0 开始的整数数组 nums1 和 nums2 ，请你返回一个长度为 2 的列表 answer ，其中：
answer[0] 是 nums1 中所有 不 存在于 nums2 中的 不同 整数组成的列表。
answer[1] 是 nums2 中所有 不 存在于 nums1 中的 不同 整数组成的列表。
注意：列表中的整数可以按 任意 顺序返回。
* */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function(nums1, nums2) {
  let ans = [[], []]
  let map = new Map()
  for(let i = 0; i < nums1.length; i++) {
    if(!map.has(nums1[i])) {
      map.set(nums1[i], 1)
    }
  }
  for(let i = 0; i < nums2.length; i++) {
    if(map.has(nums2[i]) && [1,3].includes(map.get(nums2[i])) ) {
      map.set(nums2[i], 3)
    } else {
      map.set(nums2[i], 2)
    }
  }
  map.forEach((value, key) => {
    if(value === 2) {
      ans[1].push(key)
    }
    if(value === 1) {
      ans[0].push(key)
    }
  })
  return ans
};