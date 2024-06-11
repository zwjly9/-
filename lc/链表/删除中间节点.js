var deleteMiddle = function(head) {
  let slow = head
  let fast = head
  if(!(head && head.next)) {
    return head
  }
  while(fast && fast.next) {
    fast = fast.next.next
    if(!(fast && fast.next)) {
      slow.next = slow.next.next
    }
    slow = slow.next
  }
  return slow
};