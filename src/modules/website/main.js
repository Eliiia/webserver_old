const fs = require("fs")

const error = require("./error.js")
const log = require("../../log.js")

module.exports = (req, res) => {
    let result

    if(req.method == "GET") {
        if(req.url.endsWith("/")) req.url += "index.html"
        if(req.url.endsWith(".html")) res.setHeader("Content-Type", "text/html")

        try {
            result = {
                status: 200,
                body: fs.readFileSync(`${__dirname}/www${req.url}`)
            }
        } catch(e) {
            result = error(404)
        }
    }

    res.writeHead(result.status)
    res.end(result.body)

    log("website", `${req.socket.remoteAddress} ${req.method} ${req.url}`, result.status)
}