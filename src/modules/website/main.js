const fs = require("fs")

const error = require("./error.js")
const mime = require("./mime.js")
const log = require("../../log.js")

const conf = require("../../config.json").web

module.exports = (req, res) => {
    let result

    let contentType

    if(req.method === "GET") {
        if(req.url.endsWith("/")) req.url += "index.html"
        if(fs.existsSync(`${__dirname}/www${req.url}`)) {
            if(fs.lstatSync(`${__dirname}/www${req.url}`).isDirectory()) {
                if(fs.existsSync(`${__dirname}/www${req.url}/index.html`)) {
                    res.writeHead(308, {Location: `https://${conf.domain}${req.url}/`}).end()
                    log("website", `${req.socket.remoteAddress} ${req.method} ${req.url}`, 308)
                    return
                }}}

        contentType = mime(req.url)

        try {
            result = {
                status: 200,
                body: fs.readFileSync(`${__dirname}/www${req.url}`)
            }
        } catch(e) {
            result = error(404)
            contentType = "text/html"
        }
    }
    else result = { status: 405, body: "405 Method Not Allowed" }

    res.setHeader("Content-Type", contentType)

    res.statusCode = result.status
    res.end(result.body)

    log("website", `${req.socket.remoteAddress} ${req.method} ${req.url}`, result.status)
}