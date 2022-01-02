const http = require("http")
const https = require("https")
const fs = require("fs")

const conf = require("./config.json")

// http -> https redirect
http.createServer((req, res) => {
    if(req.hostname != undefined) res.writeHead(308, {Location: `https://${req.hostname}${req.url}`})
    else res.writeHead(308, {Location: `https://${conf.domain}${req.url}`})
}).listen(conf.web.http, conf.web.hostname, () => console.log(`Cool http server running at http://${conf.web.hostname}:${conf.web.http}/`))

// https server
const website = require("./modules/website/main.js")
const httpsOptions = {
    key: fs.readFileSync(conf.ssl.key),
    cert: fs.readFileSync(conf.ssl.cert)
}

https.createServer(httpsOptions, (req, res) => website(req, res))
    .listen(conf.web.https, () => console.log(`Cool https server running at https://${conf.web.hostname}:${conf.web.https}/`))