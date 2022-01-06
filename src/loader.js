const http = require("http")
const https = require("https")
const fs = require("fs")

const log = require("./log.js")

const conf = require("./config.json")

// http -> https redirect
http.createServer((req, res) => {
    if(req.headers.host != undefined) {
        res.writeHead(308, {Location: `https://${req.headers.host}${req.url}`}).end()
        log("redirect", `${req.socket.remoteAddress} ${req.method} ${req.url}`, `308, Location: https://${req.headers.host}${req.url}`)
    }
    else {
        res.writeHead(308, {Location: `https://${conf.domain}${req.url}`}).end()
        log("redirect", `${req.socket.remoteAddress} ${req.method} ${req.url}`, `308, Location: https://${conf.domain}${req.url}`)
    }
}).listen(conf.ports.http, conf.web.hostname, () => console.log(`cool http redirect server running at http://${conf.web.hostname}:${conf.ports.http}/`))

// website https server
const website = require("./modules/website/main.js")
const websiteSSL = {
    key: fs.readFileSync(conf.ssl.websiteKey),
    cert: fs.readFileSync(conf.ssl.websiteCert)
}

https.createServer(websiteSSL, (req, res) => {
    req.url = decodeURI(req.url)

    if(req.headers.host) {
        if(req.headers.host.split(".")[0] == "api") res.writeHead(308, {Location: `https://api.${conf.domain}${req.url}`}).end()
    } return website(req, res)
}).listen(conf.ports.https, () => console.log(`cool https server running at https://${conf.web.hostname}:${conf.ports.https}/`))

// api https server
const api = require("./modules/api/main.js")
const apiSSL = {
    key: fs.readFileSync(conf.ssl.apiKey),
    cert: fs.readFileSync(conf.ssl.apiCert)
}

https.createServer(apiSSL, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    if(req.method == "OPTIONS") {
        res.statusCode = 204
        res.end()
        log("api", `${req.socket.remoteAddress} ${req.method} ${req.url}`, 204)
        return
    }

    req.url = decodeURI(req.url)

    if(req.headers.host) {
        if(req.headers.host.split(".")[0] == "api") return api(req, res)
    } res.writeHead(308, {Location: `https://${conf.domain}${req.url}`}).end()
}).listen(conf.ports.api, () => console.log(`cool https API running at https://api.${conf.api.hostname}:${conf.ports.api}/`))