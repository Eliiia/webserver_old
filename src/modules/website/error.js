const fs = require("fs")

function getPage(err) {
    return fs.readFileSync(`${__dirname}/www/err/${err}.html`)
}

module.exports = (err) => {
    switch(err) {
        case 404: // Not Found
            return {
                status: 404,
                body: getPage(404)
            }
    }
}