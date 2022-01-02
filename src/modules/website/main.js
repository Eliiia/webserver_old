const fs = require("fs")

const error = require("./error.js")
const log = require("../log.js")

module.exports = (req, res) => {

    if(req.method == "GET") {
        if(req.url.endsWith("/")) req.url += "index.html"

        fs.readFile(`${__dirname}/www${req.url}`, 
            (err, data) => {
                if(err) error(404, res)
                else {
                    res.writeHead(200)
                    res.end(data)
                }
            }
        )
    }

    log("website", `${req.socket.remoteAddress} ${req.method} ${req.url}`)
}