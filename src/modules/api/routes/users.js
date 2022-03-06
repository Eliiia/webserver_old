const userHandler = require("../userHandler.js")

module.exports = async (req, res, args) => {
    const id = args[2]
    if (!id) return { status: 400, body: { error: "400 Bad Request (No ID Supplied)" } }

    let data = await userHandler.getData(id)

    if (!data) return { status: 404, body: { error: "404 Not Found" } }

    return { status: 200, body: { data: data } }
}