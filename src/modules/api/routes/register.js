const jwt = require("jsonwebtoken")
const userHandler = require("../userHandler.js")
const conf = require("../../../config.json").api

module.exports = (req, res, args) => {
    let result = { status: 201, body: {"": ""} }

    if(!req.body.username) return { status: 400, body: { error: "400 Bad Request (No Username)" } }
    if(!req.body.password) return { status: 400, body: { error: "400 Bad Request (No Password)" } }

    const id = userHandler.addUser(req.body.username, req.body.password)
    
    if(!id) return { status: 409, body: { error: "Conflict (Username Taken)" } }

    result.body = { 
        "token": jwt.sign( { id: id }, conf.tokenSecret, { expiresIn: "30d" }),
        "id": id
    }

    return result
}