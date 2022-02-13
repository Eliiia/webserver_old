const fs = require("fs")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const conf = require("../../config.json").api
const userData = require("../../../data/users.json")

const usernames = {}

for(x in userData) {
    usernames[userData[x].name] = x
}

const saltRounds = 8
const epoch = 1640997660000

module.exports.addUser = (name, password) => {
    if(usernames.hasOwnProperty(name)) return false

    const id = Date.now() - epoch
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    userData[id] = {
        "name": name,
        "password": hashedPassword,
    }

    usernames[name] = id

    fs.writeFileSync("../data/users.json", JSON.stringify(userData))

    return id
}

module.exports.authUser = (name, password) => {
    if(!usernames.hasOwnProperty(name)) return false

    const id = usernames[name]
    
    if(bcrypt.compareSync(password, userData[id].password)) return jwt.sign( { id: usernames[name] }, conf.tokenSecret, { expiresIn: "30d" })
    
    return false
}

module.exports.getData = (id) => {
    let data = userData[id]
    if(!data) return false
    delete data.password
    return data
}