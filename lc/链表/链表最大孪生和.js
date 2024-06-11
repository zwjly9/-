var pairSum = function(head) {
  let arr = []
  while(head) {
    arr.push(head.val);
    head = head.next;
  }
  let sum = 0
  let i = 0, j = arr.length - 1;
  while(i < j) {
    sum = Math.max(sum, arr[i] + arr[j])
    i++
    j--
  }
  return sum
};

var pairSumPlus = function(head) {
  let slow = head
  let fast = head
  while(fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  //  反转 slow - fast 段。 然后从头相加
  let end = null
  let start = slwo
  while(start) {
    let next = start.next
    start.next = end
    end = start
    start = next
  }
  let sum = 0
  let p1 = head
  let p2 = end
  while(p1 && p2) {
    sum = Math.max(sum, p1.val + p2.val)
    p1 = p1.next
    p2 = p2.next
  }
  return sum
};