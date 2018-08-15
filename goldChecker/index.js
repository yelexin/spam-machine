const nodemailer = require('nodemailer')
const targets = require('../target/target')
const fs = require('fs')
const mongoose = require('mongoose')
const GoodProxy = require('../common/schemas/goodProxySchema')
const Gold = require('../common/schemas/goldSchema')
const Silver = require('../common/schemas/silverSchema')
let content = require('./content')
mongoose.connect('mongodb://yelexin:secretvalley@localhost/proxy')
console.log(44444)
GoodProxy.find({protocol: 'socks5'})
  .then(async proxies => {
    if (proxies.length === 0) {
      throw new Error('proxy pool is used up, run crawler now!')
    }
    let accounts = await Gold.find({})
    // search in gold accounts
    for (let j = 16; j < accounts.length; j++) {
      console.log('round', j)

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
        socketTimeout: 5000,
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        proxy: 'socks5://' + proxies[r2].socket
      })
      transporter.set('proxy_socks_module', require('socks'))

      let r = Math.floor(Math.random() * 10000)

      let mailOptions = {
        from: `"Survey" <${accounts[j].email}>`, // sender address
        to: targets[r], // list of receivers
        subject: content.uglySubject, // Subject line
        text: content.uglyText,
        html: content.uglyHtml
      }

      try {
        res = await transporter.sendMail(mailOptions)
        console.log('success', accounts[j])

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

          // await Silver.update({
          //     email: accounts[j].email,
          //     password: accounts[j].password
          //   },
          //   {
          //     email: accounts[j].email,
          //     password: accounts[j].password
          //   }, {upsert: true})
          // await Gold.remove({email: accounts[j].email})

        }
        if (e.command === 'CONN') {
          j--
          console.log(e)
        }
      }
    }

  })
  .catch(err => {
    console.log(err)
  })

