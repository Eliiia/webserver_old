import { readFileSync } from "fs"
import { createServer } from "http"
import { hostname } from "../config.json"
import mime from "./mime"
import error from "./error"

const dir = `${__dirname}/../../../www`

createServer(async (req, res) => {
    let result = { status: 200, body: "" }

    let contentType = ""

    if (req.method === "GET") {
        if (req.url?.endsWith("/")) req.url += "index.html"

        try {
            result.status = 200
            result.body = readFileSync(`${dir}${req.url}`, "utf8")
            contentType = mime(req.url?.split(".").pop()!)
        } catch(e) {
            result.body = error(404)
            result.status = 404
            contentType = "text/html"
        }
    }
    else result = { status: 405, body: "Method Not Allowed." }

    res.setHeader("Content-Type", contentType)
    res.statusCode = result.status
    res.end(result.body)

}).listen(3080, hostname, () => {
    console.log(`cool http api server running at http://${hostname}:3080`)
})