const mixText = require('./mixText')
let content = `希望抽空填一下问卷，谢谢 `
let link = 'http://cn.mikecrm.com/xBBdffo'
let subject = `去中心化网盘（抵制审查和封禁）调查问卷`





// uglify subject text
let uglySubject = mixText(subject)
let uglyText = mixText(content) + link
let uglyHtml = mixText(content) + '<a href="' + link + '">' + link + '</a>'
// console.log(uglySubject, uglyText)
// console.log(uglyHtml)
module.exports = {
  uglyText,
  uglySubject,
  uglyHtml
}