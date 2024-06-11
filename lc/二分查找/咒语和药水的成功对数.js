var successfulPairs = function(spells, potions, success) {
  potions.sort((a,b)=> a -b )
  for(let i = 0; i< spells.length; i++) {
    const target = Math.ceil(success / spells[i])
    spells[i] = potions.length - findMinBound(potions, target)
  }
  return spells
};
const findMinBound = (nums, target) => {
  let left = 0, right = nums.length -1
  while(left < right) {
    const mid = left + (right - left) / 2
    if(nums[mid] >= target) {
      right = mid
    } else {
      left = mid
    }
  }
  return right
}