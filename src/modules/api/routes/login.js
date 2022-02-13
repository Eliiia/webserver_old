const userHandler = require("../userHandler.js")

module.exports = (req, res, args) => {
    if(!req.body.username) return { status: 400, body: { error: "400 Bad Request" } }
    if(!req.body.password) return { status: 400, body: { error: "400 Bad Request" } }
    
    const token = userHandler.authUser(req.body.username, req.body.password)

    if(token == false) { return { status: 401, body: { error: "401 Not Authenticated (wrong username and/or password)" } } }
    return { status: 200, body: { "token": token } }
}