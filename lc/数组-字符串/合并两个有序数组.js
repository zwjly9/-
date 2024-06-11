/*
88. 合并两个有序数组
给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
* */

var merge = function(nums1, m, nums2, n) {
  let slow = m -1, fast = n - 1,tail = m + n - 1,cur
  while(slow >= 0 || fast >= 0) {
    if(slow === -1) {
      cur = nums2[fast]
      fast--
    } else if(fast === -1) {
      cur = nums1[slow]
      slow--
    } else if(nums1[slow] >= nums2[fast]) {
      cur = nums1[slow]
      slow--;
    }else {
      cur = nums2[fast]


      fast--
    }
    nums1[tail] = cur
    tail--
  }
};


/*
* 思路：
* 双指针倒叙遍历，将值大的一个塞到nums1最后位置。 注意nums1和nums2元素为空的情况
* */