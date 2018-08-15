const ping = require('ping')
const Proxy = require('../common/schemas/proxySchema')
const GoodProxy = require('../common/schemas/goodProxySchema')
const axios = require('axios')

async function go() {
  try {
    let proxies = await Proxy.find({protocol: {$in:['high','anonymous']}})
    if(proxies) {
      for (let i = 0; i < proxies.length; i++) {
        try {
          let res = await ping.promise.probe(proxies[i].socket.split(':')[0])
          if (!res.alive) {
            let host = res.host
            await Proxy.remove({socket: new RegExp(host)})
            console.log('delete host: ' + host)
          } else {
            try {
              let res = await axios({
                url: 'http://www.qq.com',
                timeout: 2000,
                proxy: {
                  host: proxies[i].socket.split(':')[0],
                  port: proxies[i].socket.split(':')[1]

                }
              })
              // console.log(info.socket);
              console.log('good http proxy: ' + proxies[i].socket)
              await GoodProxy.update({
                protocol: proxies[i].protocol,
                socket: proxies[i].socket
              }, {
                protocol: proxies[i].protocol,
                socket: proxies[i].socket
              }, {upsert: true})
            } catch (err) {
              console.log('remove garbage http proxy： ' + proxies[i].socket)
              await Proxy.remove({socket: new RegExp(proxies[i].socket)})
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      console.log('finished')
    }
  } catch (e) {
    console.log(e)
  }
}
go()