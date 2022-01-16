const log = require("../../log.js")

const routes = {
    "ping": [ ["GET"], require("./routes/ping.js") ],
    "login": [ ["POST"], require("./routes/login.js") ],
    "register": [ ["POST"], require("./routes/register.js") ],
}

module.exports = (req, res) => {
    let result

    res.setHeader("Content-Type", "application/json")

    const args = req.url.split("/")

    if(!routes[args[1]] || args.length == 2) result = { status: 404, body: "404 Not Found" }
    else if(!routes[args[1]][0].includes(req.method)) result = { status: 405, body: "405 Method Not Allowed" }
    else if(!["application/json", undefined].includes(req.headers["content-type"])) result = { status: 400, body: `400 Bad Request\n\n`}

    if(result == undefined) {
        try { result = routes[args[1]][1](req, res, args) }
        catch(e) { result = {status: 500, body: `500 Internal Server Error\n\n${e}`} }
    }

    res.statusCode = result.status
    res.end(result.body)

    log("api", `${req.socket.remoteAddress} ${req.method} ${req.url}`, result.status)
}