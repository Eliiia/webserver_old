const fs = require("fs")
const bcrypt = require("bcrypt")
const userData = require("../../../data/users.json")
const jwt = require("jsonwebtoken")

const usernames = {}

for(x in userData) {
    usernames[x] = userData[x].name
}

const saltRounds = 8
const epoch = 1640997660000

module.exports.addUser = (name, password) => {
    if(!usernames[name]) return false

    const id = Date.now() - epoch
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    userData[id] = {
        "name": name,
        "password": hashedPassword,
    }

    fs.writeFileSync("../data/users.json", JSON.stringify(userData))

    return id
}