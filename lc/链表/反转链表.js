var reverseList = function(head) {
  /*
  * pre -> cur -> next 变成 pre <- cur <- next
  * */
  if(head === null) {
    return head
  }
  let pre = null
  let cur = head
  while(cur && cur.next) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
};