module.exports = function randomChar() {

  let u = '\\u' + ('00' + Math.floor(Math.random() * 6399+57344).toString(16)).slice(-4)
  // 解码
  function decodeUnicode(str) {
    str = str.replace(/\\/g, '%')
    return unescape(str)
  }

  return decodeUnicode(u)
}
