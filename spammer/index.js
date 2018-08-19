const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const GoodProxy = require('../common/schemas/goodProxySchema')
const Gold = require('../common/schemas/goldSchema')
const targets = require('../target/target')
const config = require('./config')
mongoose.connect('mongodb://yelexin:secretvalley@localhost/proxy')
var sleep = async (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
};
async function go() {
  for (let i = config.startFrom; i < targets.length; i++) {
    console.log('round ', i)
    await sleep(config.delay)
    let gold = await Gold.find({})
    let proxies = await GoodProxy.find({protocol: 'socks5'})
    let r = Math.floor(Math.random() * gold.length)
    let r2 = Math.floor(Math.random() * proxies.length)
    let transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: gold[r].email, // generated ethereal user
        pass: gold[r].password // generated ethereal password
      },
      socketTimeout: 10000,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      // proxy: 'socks5://' + proxies[0].socket
    })
    // transporter.set('proxy_socks_module', require('socks'))

    let mailOptions = {
      from: `"Survey" <${gold[r].email}>`, // sender address
      to: targets[i], // list of receivers
      subject: require('./content')().uglySubject, // Subject line
      text: require('./content')().uglyText,
      html: require('./content')().uglyHtml
    }

    try {
      let res = await transporter.sendMail(mailOptions)
      console.log(res)
      console.log('使用账号',gold[r].email, gold[r].password)
    } catch (e) {
      console.log(e)
      if(e.command === 'DATA'||e.command === 'CONN') {
        i--
      }
    }
  }
  console.log('spam finished')
}
go()
