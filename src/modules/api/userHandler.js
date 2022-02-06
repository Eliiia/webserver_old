const fs = require("fs")
const bcrypt = require("bcrypt")
const userData = require("../../../data/users.json")
const jwt = require("jsonwebtoken")

const saltRounds = 8
const epoch = 1640997660000

module.exports.addUser = (name, password) => {
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const id = Date.now() - epoch

    userData[id] = {
        "name": name,
        "password": hashedPassword,
    }

    fs.writeFileSync("../data/users.json", JSON.stringify(userData))

    return id
}