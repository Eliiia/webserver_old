const jwt = require("jsonwebtoken")
const userHandler = require("../userHandler.js")
const conf = require("../../../config.json")

module.exports = (req, res, args) => {
    let result = { status: 201, body: {"": ""} }

    if(!req.headers.username) return { status: 400, body: { error: "400 Bad Request" } }
    if(!req.headers.password) return { status: 400, body: { error: "400 Bad Request" } }

    const id = userHandler.addUser(req.headers.username, req.headers.password)

    result.body = { "token": jwt.sign( { id: id }, conf.api.tokenSecret, { expiresIn: "30d" }) }

    return result
}