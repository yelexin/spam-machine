module.exports = function randomChar() {
  let words = [
    '人','口','一','二','儿','三','八','十','廿','中','下','上','大','小','天','田', 'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm' ]

  return words[Math.random() * words.length]
}
