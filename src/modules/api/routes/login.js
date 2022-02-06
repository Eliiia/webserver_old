const userHandler = require("../userHandler.js")

module.exports = (req, res, args) => {
    if(!req.headers.username) return { status: 400, body: { error: "400 Bad Request" } }
    if(!req.headers.password) return { status: 400, body: { error: "400 Bad Request" } }
    
    const token = userHandler.authUser(req.headers.username, req.headers.password)

    if(token == false) { return { status: 401, body: { error: "401 Not Authenticated (wrong username and/or password)" } } }
    return { status: 200, body: { "token": token } }
}