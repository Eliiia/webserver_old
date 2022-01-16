const log = require("../../log.js")

const routes = {
    "ping": [ ["GET"], require("./routes/ping.js") ],
}

module.exports = (req, res) => {
    let result

    res.setHeader("Content-Type", "application/json")

    const args = req.url.split("/")

    if(!routes[args[1]] || args.length == 2) result = { status: 404, body: "404 Not Found" }
    else if(!routes[args[1]][0].includes(req.method)) result = { status: 405, body: "405 Method Not Allowed" }

    else {
        try { result = routes[args[1]][1](req, res, args) }
        catch(e) { result = {status: 500, body: `500 Internal Server Error\n\n${e}`} }
    }

    res.statusCode = result.status
    res.end(result.body)

    log("api", `${req.socket.remoteAddress} ${req.method} ${req.url}`, result.status)
}