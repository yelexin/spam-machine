const axios = require('axios')
const cheerio = require('cheerio')
const querystring = require('querystring')
const fs = require('fs')
const Proxy = require('../common/schemas/proxySchema')
const mongoose = require('mongoose')
const proxyChecker = require('../proxyChecker/index')
let region = ['安徽', '广东', '江苏', '北京', '浙江', '山东', '上海', '湖南', '河南', '辽宁', '四川', '湖北', '福建', '河北', '吉林', '江西', '山西', '重庆', '陕西', '内蒙古', '天津', '云南', '西藏', '广西', '黑龙江', '贵州', '新疆', '甘肃', '海南', '青海']
mongoose.connect('mongodb://yelexin:secretvalley@localhost/proxy')

async function proxyCrawler () {
  for (let j = 0; j < region.length; j++) {
    let res = null
    try {
      res = await axios({
        method: 'get',
        url: `http://31f.cn/region/${querystring.escape(region[j])}/`
      })
      let html = res.data
      let $ = cheerio.load(html)
      let table = $('table')[0]
      let rows = $(table).find('tr')
      let sockets = []
      for (let i = 1; i < rows.length; i++) {
        let protocol = $($(rows[i]).find('td')[6]).text()
        let socket = $($(rows[i]).find('td')[1]).text() + ':' + $($(rows[i]).find('td')[2]).text()
        await Proxy.update({
          protocol,
          socket
        }, {
          protocol,
          socket
        }, {upsert: true})
      }
      // console.log(sockets)
      // let socks5 = sockets.filter(i => i.protocol === 'socks5')
    } catch (e) {
      console.log(e)
    }
  }
  proxyChecker()

}
setInterval(proxyCrawler, 3700000)
