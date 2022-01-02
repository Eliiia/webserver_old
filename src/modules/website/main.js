const http = require("http")
const https = require("https")
const fs = require("fs")

module.exports = (req, res) => {
    console.log(`Connection from ${req.headers.host}`)

    if(req.method == "GET") {
        fs.readFile(`${__dirname}/www${req.url}`, 
            (err, data) => {
                if(err) res.writeHead(404)
                else {
                    res.writeHead(200)
                    res.end(data)
                }
            }
        )
    }
}