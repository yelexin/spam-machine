const ping = require('ping')
const Proxy = require('../common/schemas/proxySchema')
const GoodProxy = require('../common/schemas/goodProxySchema')
const SocksClient = require('socks').SocksClient

async function go() {
  try {
    let proxies = await Proxy.find({protocol: 'socks5'})
    if (proxies) {
      for (let i = 0; i < proxies.length; i++) {
        try {
          let res = await ping.promise.probe(proxies[i].socket.split(':')[0])
          if (!res.alive) {
            let host = res.host
            await Proxy.remove({socket: new RegExp(host)})
            console.log('delete host: ' + host)
          } else {
            //test socks
            console.log('ok')
            let options = {
              proxy: {
                ipaddress: res.host,
                port: parseInt(proxies[i].socket.split(':')[1]),
                type: 5 // Proxy version (4 or 5)
              },

              command: 'connect', // SOCKS command (createConnection factory function only supports the connect command)

              destination: {
                host: 'qq.com', // github.com (hostname lookups are supported with SOCKS v4a and 5)
                port: 80
              },
              timeout: 4000
            }
            try {
              const info = await SocksClient.createConnection(options)

              // console.log(info.socket);
              console.log('good socks: ' + proxies[i].socket)
              await GoodProxy.update({
                protocol: proxies[i].protocol,
                socket: proxies[i].socket
              }, {
                protocol: proxies[i].protocol,
                socket: proxies[i].socket,
                stable:true
              }, {upsert: true})
              // <Socket ...>  (this is a raw net.Socket that is established to the destination host through the given proxy server)
            } catch (err) {
              // Handle errors
              console.log('remove garbage socks： ' + err.options.proxy.ipaddress)
              await Proxy.remove({socket: new RegExp(err.options.proxy.ipaddress)})
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      console.log('finished')
    } else {
      console.log('proxy pool used up. run crawler now!')
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = go