const log = require("../../log.js")

const modules = {
    "ping": require("./modules/ping.js")
}

module.exports = (req, res) => {
    let success

    if(req.method == "GET") {
        res.setHeader("Content-Type", "application/json")

        let result
        const args = req.url.split("/")

        if(!modules[args[1]]) result = { status: 404, body: "404 Not Found" }

        if(args.length == 2) result = { status: 404, body: "404 Not Found" }
        if(result == undefined && modules[args[1]]) {
            try { result = modules[args[1]](req, res, args) }
        
            catch(e) { result = {status: 500, body: `500 Internal Server Error\n\n${e}`} }
        }

        if(result.status == 200) success = true
        else success = false

        res.writeHead(result.status)
        res.end(result.body)
    }
}