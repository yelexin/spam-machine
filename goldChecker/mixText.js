const randomChar = require('./randomChar')
module.exports = function mixText(txt) {
  let arr = txt.split('')
  let r3 = Math.random() * txt.length / 2
  for (let k = 0; k < r3; k++) {
    arr.splice(Math.floor(Math.random() * txt.length), 0, randomChar())
  }
  txt = arr.join('')
  return txt
}
