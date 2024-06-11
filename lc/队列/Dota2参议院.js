var predictPartyVictory = function (senate) {
  let r = []
  let d = []
  for(let i = 0; i < senate.length; i++) {
    if(senate[i] === 'R') {
      r.push(i)
    }else {
      d.push(i)
    }
  }
  while(d.length && r.length) {
    d[0] < r[0] ? d.push(d[0] + senate.length) : r.push(r[0] + senate.length)
    d.shift()
    r.shift()
  }
  return d.length ? 'Dire' : 'Radiant'
};
predictPartyVictory('DDRRR')