const mixText = require('./mixText')
let content = `麻烦您填一下调查 `
let link = 'http://cn.mikecrm.com/xBBdffo'
let subject = `去中心化网盘意见调研`




module.exports = function(){return {

  uglySubject: mixText(subject),
  uglyText: mixText(content) + link,
  uglyHtml: mixText(content) + '<a href="' + link + '">' + link + '</a>'
}
}
