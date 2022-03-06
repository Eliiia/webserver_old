import { createServer } from "http"
import { hostname } from "../config.json"

createServer((req, res) => {
    res.end("moo")
}).listen(3080, hostname, () => {
    console.log(`cool http api server running at http://${hostname}:3080`)
})