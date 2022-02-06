const log = require("../../log.js")

const routes = {
    "ping": [ ["GET"], require("./routes/ping.js") ],
    "register": [ ["POST"], require("./routes/register.js")],
}

module.exports = (req, res) => {
    let result

    res.setHeader("Content-Type", "application/json")

    const args = req.url.split("/")

    if(!routes[args[1]] || args.length == 2) result = { status: 404, body: { error: "404 Not Found" } }
    else if(!routes[args[1]][0].includes(req.method)) result = { status: 405, body: { error: "405 Method Not Allowed" } }
    else if(!["application/json", undefined].includes(req.headers["content-type"])) result = { status: 400, body: { error: `400 Bad Request\n\n` } }

    if(result == undefined) {
        try { result = routes[args[1]][1](req, res, args) }
        catch(e) { result = { status: 500, body: { error: `500 Internal Server Error\n\n${e.stack}` } } }
    }

    res.statusCode = result.status
    res.end(JSON.stringify(result.body))

    log("api", `${req.socket.remoteAddress} ${req.method} ${req.url}`, result.status)
}