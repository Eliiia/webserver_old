const http = require("http")
const https = require("https")
const fs = require("fs")

const error = require("./error.js")

module.exports = (req, res) => {
    console.log(`Connection from ${req.socket.remoteAddress} to ${req.url}`)

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
}