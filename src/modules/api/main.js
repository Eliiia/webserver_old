const log = require("../../log.js")

const routes = {
    "ping": require("./routes/ping.js"),
    "lyrics": require("./routes/lyrics.js")
}

module.exports = (req, res) => {
    let result

    if(req.method == "GET") {
        res.setHeader("Content-Type", "application/json")

        const args = req.url.split("/")

        if(!routes[args[1]]) result = { status: 404, body: "404 Not Found" }

        if(args.length == 2) result = { status: 404, body: "404 Not Found" }
        if(result == undefined && routes[args[1]]) {
            try { result = routes[args[1]](req, res, args) }
        
            catch(e) { result = {status: 500, body: `500 Internal Server Error\n\n${e}`} }
        }
    }
    else result = { status: 405, body: "405 Method Not Allowed" }

    res.statusCode = result.status
    res.end(result.body)

    log("api", `${req.socket.remoteAddress} ${req.method} ${req.url}`, result.status)
}